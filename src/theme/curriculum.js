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
    { id: "historia_peru", name: "Historia General del Perú", emoji: "🇵🇪", lessons: 3, quizzes: 3 },
    { id: "civilizaciones_preincaicas", name: "Civilizaciones Preincaicas", emoji: "🗿", lessons: 3, quizzes: 3 },
    { id: "imperio_incaico", name: "Imperio Incaico", emoji: "🦙", lessons: 3, quizzes: 3 },
    { id: "conquista_colonia", name: "Conquista y Colonia", emoji: "⚔️", lessons: 3, quizzes: 3 },
    { id: "guerra_del_pacifico", name: "Guerra del Pacífico", emoji: "🏴", lessons: 3, quizzes: 3 },
    { id: "historia_universal", name: "Historia General Universal", emoji: "🌍", lessons: 3, quizzes: 3 },
    { id: "revolucion_industrial", name: "Revolución Industrial", emoji: "🏭", lessons: 3, quizzes: 3 },
    { id: "guerra_mundial_1", name: "Primera Guerra Mundial", emoji: "💣", lessons: 3, quizzes: 3 },
    { id: "guerra_mundial_2", name: "Segunda Guerra Mundial", emoji: "☢️", lessons: 3, quizzes: 3 },
    { id: "guerra_franco_prusiana", name: "Guerra Franco-Prusiana", emoji: "🗡️", lessons: 3, quizzes: 3 },
    { id: "revolucion_rusa", name: "Revolución Rusa", emoji: "☭", lessons: 3, quizzes: 3 },
    { id: "guerra_fria", name: "Guerra Fría", emoji: "🧊", lessons: 3, quizzes: 3 },
  ],
  quimica: [
    { id: "quimica_general", name: "Química General", emoji: "🧪", lessons: 3, quizzes: 3 },
    { id: "tabla_periodica", name: "Tabla Periódica", emoji: "📊", lessons: 3, quizzes: 3 },
    { id: "enlaces_quimicos", name: "Enlaces Químicos", emoji: "🔗", lessons: 3, quizzes: 3 },
    { id: "reacciones_quimicas", name: "Reacciones Químicas", emoji: "⚗️", lessons: 3, quizzes: 3 },
    { id: "acidos_bases", name: "Ácidos y Bases", emoji: "💧", lessons: 3, quizzes: 3 },
    { id: "quimica_organica", name: "Química Orgánica", emoji: "🔬", lessons: 3, quizzes: 3 },
  ],
  ingles: [
    { id: "ingles_basico", name: "Inglés Básico", emoji: "🇬🇧", lessons: 3, quizzes: 3 },
    { id: "ingles_gramatica", name: "Gramática Inglesa", emoji: "📖", lessons: 3, quizzes: 3 },
    { id: "ingles_verbos", name: "Verbos Irregulares", emoji: "📝", lessons: 3, quizzes: 3 },
    { id: "ingles_conversacion", name: "Conversación", emoji: "💬", lessons: 3, quizzes: 3 },
  ],
  geografia: [
    { id: "geografia_general", name: "Geografía General", emoji: "🌍", lessons: 3, quizzes: 3 },
    { id: "geografia_fisica", name: "Geografía Física", emoji: "🏔️", lessons: 3, quizzes: 3 },
    { id: "geografia_peru", name: "Geografía del Perú", emoji: "🇵🇪", lessons: 3, quizzes: 3 },
  ],
  biologia: [
    { id: "biologia_general", name: "Biología General", emoji: "🧬", lessons: 3, quizzes: 3 },
    { id: "celulas", name: "Células", emoji: "🔬", lessons: 3, quizzes: 3 },
    { id: "genetica", name: "Genética", emoji: "🧪", lessons: 3, quizzes: 3 },
    { id: "ecologia", name: "Ecología", emoji: "🌿", lessons: 3, quizzes: 3 },
    { id: "anatomia_humana", name: "Anatomía Humana", emoji: "🫀", lessons: 3, quizzes: 3 },
  ],
};

export const difficultyLevels = [
  { id: "facil", label: "Fácil", color: "#4CAF50", emoji: "⭐" },
  { id: "medio", label: "Medio", color: "#FF9800", emoji: "⭐⭐" },
  { id: "dificil", label: "Difícil", color: "#F44336", emoji: "⭐⭐⭐" },
];
