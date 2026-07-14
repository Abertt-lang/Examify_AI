export const courses = [
  { id: "historia", name: "Historia", emoji: "🏛️", bg: "#FDF1DC" },
  { id: "matematicas", name: "Matemáticas", emoji: "📐", bg: "#E8ECFB" },
  { id: "quimica", name: "Química", emoji: "🧪", bg: "#DFF3EE" },
  { id: "ingles", name: "Inglés", emoji: "🇬🇧", bg: "#EDE7FA" },
  { id: "geografia", name: "Geografía", emoji: "🌍", bg: "#E7F5E1" },
  { id: "biologia", name: "Biología", emoji: "🧬", bg: "#FBE6E6" },
];

export const topicsByCourse = {
  matematicas: [
    { id: "aritmetica", name: "Aritmética", emoji: "🔢", lessons: 3, quizzes: 3 },
    { id: "algebra", name: "Álgebra", emoji: "🔤", lessons: 3, quizzes: 3 },
    { id: "ecuaciones", name: "Ecuaciones", emoji: "📐", lessons: 3, quizzes: 3 },
    { id: "inecuaciones", name: "Inecuaciones", emoji: "📊", lessons: 3, quizzes: 3 },
    { id: "geometria", name: "Geometría", emoji: "📏", lessons: 3, quizzes: 3 },
    { id: "trigonometria", name: "Trigonometría", emoji: "📉", lessons: 3, quizzes: 3 },
    { id: "estadistica", name: "Estadística", emoji: "📈", lessons: 3, quizzes: 3 },
  ],
  historia: [
    { id: "historia_peru", name: "Historia del Perú", emoji: "🇵🇪", lessons: 20 },
    { id: "historia_universal", name: "Historia Universal", emoji: "🌍", lessons: 22 },
  ],
  quimica: [
    { id: "quimica_general", name: "Química General", emoji: "🧪", lessons: 18 },
  ],
  ingles: [
    { id: "ingles_basico", name: "Inglés Básico", emoji: "🇬🇧", lessons: 20 },
  ],
  geografia: [
    { id: "geografia_general", name: "Geografía General", emoji: "🌍", lessons: 16 },
  ],
  biologia: [
    { id: "biologia_general", name: "Biología General", emoji: "🧬", lessons: 18 },
  ],
};

export const difficultyLevels = [
  { id: "facil", label: "Fácil", color: "#4CAF50", emoji: "⭐" },
  { id: "medio", label: "Medio", color: "#FF9800", emoji: "⭐⭐" },
  { id: "dificil", label: "Difícil", color: "#F44336", emoji: "⭐⭐⭐" },
];
