export default {
  aritmetica: [
    {
      question: "¿Cuánto es 24 ÷ 6?",
      options: ["3", "4", "6", "8"],
      correctIndex: 1,
    },
    {
      question: "¿Cuál es el 20% de 150?",
      options: ["20", "25", "30", "35"],
      correctIndex: 2,
    },
    {
      question: "¿Cuál de estos números es primo?",
      options: ["9", "15", "17", "21"],
      correctIndex: 2,
    },
  ],
  ecuaciones: [
    {
      question: "Resuelve: 2x + 5 = 17",
      options: ["x = 5", "x = 6", "x = 7", "x = 8"],
      correctIndex: 1,
    },
    {
      question: "Resuelve: 3x - 4 = 11",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      correctIndex: 2,
    },
    {
      question: "Resuelve: x/4 = 9",
      options: ["x = 13", "x = 24", "x = 36", "x = 45"],
      correctIndex: 2,
    },
  ],
  // Para cualquier subtema sin preguntas propias todavía
  // (esto se reemplazará con preguntas generadas por IA más adelante)
  default: [
    {
      question: "Esta es una pregunta de ejemplo para este tema.",
      options: ["Opción A", "Opción B", "Opción C", "Opción D"],
      correctIndex: 0,
    },
    {
      question: "Segunda pregunta de ejemplo.",
      options: ["Opción A", "Opción B", "Opción C", "Opción D"],
      correctIndex: 1,
    },
  ],
};
