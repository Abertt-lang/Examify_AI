import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../config/firebase";

const BASE_KEY = "@examify_progress";

function getStorageKey() {
  const uid = auth.currentUser?.uid;
  return uid ? `${BASE_KEY}_${uid}` : `${BASE_KEY}_guest`;
}

async function getProgress() {
  try {
    const raw = await AsyncStorage.getItem(getStorageKey());
    if (raw) return JSON.parse(raw);
    return { quizzes: [], lessonsCompleted: [] };
  } catch {
    return { quizzes: [], lessonsCompleted: [] };
  }
}

export async function saveQuizResult({ courseId, topicId, difficulty, score, total, answers = [] }) {
  const progress = await getProgress();
  const entry = {
    courseId,
    topicId,
    difficulty,
    score,
    total,
    date: Date.now(),
    answers,
  };
  progress.quizzes.push(entry);
  await AsyncStorage.setItem(getStorageKey(), JSON.stringify(progress));
  return entry;
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

export async function getRecentQuizzes(limit = 10) {
  const progress = await getProgress();
  return progress.quizzes
    .sort((a, b) => b.date - a.date)
    .slice(0, limit)
    .map((q) => ({
      ...q,
      percent: Math.round((q.score / q.total) * 100),
    }));
}

export async function getTrendData(courseId, limit = 5) {
  const progress = await getProgress();
  const filtered = courseId
    ? progress.quizzes.filter((q) => q.courseId === courseId)
    : progress.quizzes;

  return filtered
    .sort((a, b) => a.date - b.date)
    .slice(-limit)
    .map((q) => ({
      date: q.date,
      percent: Math.round((q.score / q.total) * 100),
      score: q.score,
      total: q.total,
    }));
}
