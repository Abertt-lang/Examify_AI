export const correctTips = [
  "¡Excelente! Vas muy bien, sigue así.",
  "¡Correcto! Dominas este tema.",
  "¡Muy bien! Cada acierto suma para tu racha.",
  "¡Perfecto! Tu esfuerzo se nota.",
];

export const incorrectTips = [
  "No te preocupes, equivocarse es parte de aprender.",
  "Casi. Revisa bien la operación antes de responder.",
  "Está bien fallar, lo importante es entender el porqué.",
  "Tranquilo, inténtalo de nuevo en la siguiente.",
];

export function pickTip(isCorrect) {
  const pool = isCorrect ? correctTips : incorrectTips;
  return pool[Math.floor(Math.random() * pool.length)];
}
