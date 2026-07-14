export const correctTips = [
  "¡Excelente! Vas muy bien, sigue así.",
  "¡Correcto! Dominas este tema.",
  "¡Muy bien! Cada acierto suma para tu racha.",
  "¡Perfecto! Tu esfuerzo se nota.",
  "¡Genial! Esa respuesta es impecable.",
  "¡Bravo! Sigue demostrando tu talento.",
  "¡Así se hace! Tu conocimiento brilla.",
  "¡Fantástico! Estás en racha.",
  "¡Increíble! No paras de acertar.",
  "¡Súper! Esa fue rápida y correcta.",
];

export const incorrectTips = [
  "No te preocupes, equivocarse es parte de aprender.",
  "Casi. Revisa bien la operación antes de responder.",
  "Está bien fallar, lo importante es entender el porqué.",
  "Tranquilo, inténtalo de nuevo en la siguiente.",
  "¡No te rindas! El siguiente es tuyo.",
  "Ups, pero cada error te hace más fuerte.",
  "Casi lo logras. Lee con calma la pregunta.",
  "No pasa nada, ¡la siguiente la sacas!",
  "Aprender de errores es de sabios. ¡Sigue!",
  "Ánimo, el camino al acierto es practicar.",
];

export function pickTip(isCorrect) {
  const pool = isCorrect ? correctTips : incorrectTips;
  return pool[Math.floor(Math.random() * pool.length)];
}
