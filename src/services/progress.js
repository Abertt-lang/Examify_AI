import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@examify_progress";

async function getProgress() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    return { quizzes: [], lessonsCompleted: [] };
  } catch {
    return { quizzes: [], lessonsCompleted: [] };
  }
}

export async function saveQuizResult({ courseId, topicId, difficulty, score, total }) {
  const progress = await getProgress();
  const entry = {
    courseId,
    topicId,
    difficulty,
    score,
    total,
    date: Date.now(),
  };
  progress.quizzes.push(entry);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return entry;
}

export async function saveLessonCompleted({ courseId, topicId, difficulty }) {
  const progress = await getProgress();
  const alreadyDone = progress.lessonsCompleted.some(
    (l) => l.courseId === courseId && l.topicId === topicId && l.difficulty === difficulty
  );
  if (!alreadyDone) {
    progress.lessonsCompleted.push({
      courseId,
      topicId,
      difficulty,
      date: Date.now(),
    });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
}

export async function getCourseStats(courseId) {
  const progress = await getProgress();
  const courseQuizzes = progress.quizzes.filter((q) => q.courseId === courseId);
  const courseLessons = progress.lessonsCompleted.filter((l) => l.courseId === courseId);

  const topicIds = [...new Set(courseQuizzes.map((q) => q.topicId))];
  let totalCorrect = 0;
  let totalAnswered = 0;
  const topicStats = {};

  for (const q of courseQuizzes) {
    if (!topicStats[q.topicId]) {
      topicStats[q.topicId] = { best: 0, total: 0, correct: 0, answered: 0, quizzesTaken: 0 };
    }
    const ts = topicStats[q.topicId];
    ts.total += q.total;
    ts.correct += q.score;
    ts.answered += q.total;
    ts.quizzesTaken += 1;
    const pct = Math.round((q.score / q.total) * 100);
    if (pct > ts.best) ts.best = pct;

    totalCorrect += q.score;
    totalAnswered += q.total;
  }

  const avgScore = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return {
    courseId,
    totalQuizzes: courseQuizzes.length,
    totalLessons: courseLessons.length,
    avgScore,
    topicStats,
    topicIds,
  };
}

export async function getAllStats() {
  const progress = await getProgress();
  const courseIds = [...new Set(progress.quizzes.map((q) => q.courseId))];

  const courses = {};
  for (const cid of courseIds) {
    courses[cid] = await getCourseStats(cid);
  }

  const totalQuizzes = progress.quizzes.length;
  const totalLessons = progress.lessonsCompleted.length;
  let totalCorrect = 0;
  let totalAnswered = 0;
  for (const q of progress.quizzes) {
    totalCorrect += q.score;
    totalAnswered += q.total;
  }
  const avgScore = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return {
    totalQuizzes,
    totalLessons,
    avgScore,
    courses,
    courseIds,
  };
}

export async function getTopicBestScore(courseId, topicId) {
  const progress = await getProgress();
  const topicQuizzes = progress.quizzes.filter(
    (q) => q.courseId === courseId && q.topicId === topicId
  );
  if (topicQuizzes.length === 0) return null;

  let best = 0;
  for (const q of topicQuizzes) {
    const pct = Math.round((q.score / q.total) * 100);
    if (pct > best) best = pct;
  }
  return { best, total: topicQuizzes.length };
}

export async function getDifficultyStats(courseId, topicId) {
  const progress = await getProgress();
  const diffs = ["facil", "medio", "dificil"];
  const result = {};

  for (const d of diffs) {
    const quizzes = progress.quizzes.filter(
      (q) => q.courseId === courseId && q.topicId === topicId && q.difficulty === d
    );
    if (quizzes.length === 0) {
      result[d] = { taken: false, best: 0, attempts: 0 };
    } else {
      let best = 0;
      for (const q of quizzes) {
        const pct = Math.round((q.score / q.total) * 100);
        if (pct > best) best = pct;
      }
      result[d] = { taken: true, best, attempts: quizzes.length };
    }
  }
  return result;
}
