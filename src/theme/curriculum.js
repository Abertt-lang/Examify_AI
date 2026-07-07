export const courses = [
  { id: "historia", name: "Historia", emoji: "🏛️", bg: "#FDF1DC" },
  { id: "matematicas", name: "Matemáticas", emoji: "📐", bg: "#E8ECFB" },
  { id: "quimica", name: "Química", emoji: "🧪", bg: "#DFF3EE" },
  { id: "ingles", name: "Inglés", emoji: "🇬🇧", bg: "#EDE7FA" },
  { id: "geografia", name: "Geografía", emoji: "🌍", bg: "#E7F5E1" },
  { id: "biologia", name: "Biología", emoji: "🧬", bg: "#FBE6E6" },
];

// Cada curso tiene su propia lista de subtemas.
// Por ahora solo Matemáticas está completo (nuestro ejemplo);
// los demás cursos tienen subtemas de prueba, fáciles de ampliar después.
export const topicsByCourse = {
  matematicas: [
    { id: "aritmetica", name: "Aritmética", emoji: "🔢", lessons: 24 },
    { id: "algebra", name: "Álgebra", emoji: "🔤", lessons: 32 },
    { id: "ecuaciones", name: "Ecuaciones", emoji: "📐", lessons: 18 },
    { id: "inecuaciones", name: "Inecuaciones", emoji: "📊", lessons: 16 },
    { id: "geometria", name: "Geometría", emoji: "📏", lessons: 28 },
    { id: "trigonometria", name: "Trigonometría", emoji: "📉", lessons: 20 },
    { id: "estadistica", name: "Estadística", emoji: "📈", lessons: 14 },
  ],
  historia: [
    {
      id: "historia_peru",
      name: "Historia del Perú",
      emoji: "🇵🇪",
      lessons: 20,
    },
    {
      id: "historia_universal",
      name: "Historia Universal",
      emoji: "🌍",
      lessons: 22,
    },
  ],
  quimica: [
    {
      id: "quimica_general",
      name: "Química General",
      emoji: "🧪",
      lessons: 18,
    },
  ],
  ingles: [
    { id: "ingles_basico", name: "Inglés Básico", emoji: "🇬🇧", lessons: 20 },
  ],
  geografia: [
    {
      id: "geografia_general",
      name: "Geografía General",
      emoji: "🌍",
      lessons: 16,
    },
  ],
  biologia: [
    {
      id: "biologia_general",
      name: "Biología General",
      emoji: "🧬",
      lessons: 18,
    },
  ],
};
