import {
  courses,
  topicsByCourse,
  getDifficultyForLesson,
  getLessonLabel,
  difficultyLevels,
} from "../src/theme/curriculum";

describe("curriculum", () => {
  test("tiene cursos definidos", () => {
    expect(courses.length).toBeGreaterThan(0);
    expect(courses[0]).toHaveProperty("id");
    expect(courses[0]).toHaveProperty("name");
  });

  test("cada curso tiene tópicos", () => {
    for (const course of courses) {
      expect(topicsByCourse[course.id]?.length).toBeGreaterThan(0);
    }
  });

  test("getDifficultyForLesson mapea 1-3", () => {
    expect(getDifficultyForLesson(1)).toBe("facil");
    expect(getDifficultyForLesson(2)).toBe("medio");
    expect(getDifficultyForLesson(3)).toBe("dificil");
  });

  test("getLessonLabel mapea 1-3", () => {
    expect(getLessonLabel(1)).toBe("Básico");
    expect(getLessonLabel(2)).toBe("Intermedio");
    expect(getLessonLabel(3)).toBe("Avanzado");
  });

  test("tiene 3 niveles de dificultad", () => {
    expect(difficultyLevels).toHaveLength(3);
    expect(difficultyLevels.map((d) => d.id)).toEqual(["facil", "medio", "dificil"]);
  });
});