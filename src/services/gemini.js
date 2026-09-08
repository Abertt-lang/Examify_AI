
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

async function callGemini(parts) {
  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("[GEMINI] API error:", err);
    throw new Error("Error al conectar con Gemini");
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini no devolvió contenido");
  return text;
}

function parseJSON(text) {
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned);
}

export async function generateQuizFromDocument(base64Data, fileName, numQuestions = 5) {
  const ext = fileName.split(".").pop().toLowerCase();
  const mimeMap = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    pdf: "application/pdf",
  };
  const mimeType = mimeMap[ext] || "image/jpeg";

  const textPart = {
    text: `Eres un profesor experto. Analiza el archivo adjunto (archivo: "${fileName}") que contiene contenido educativo.

Genera exactamente ${numQuestions} preguntas de opción múltiple basadas en lo que ves en el archivo.

IMPORTANTE: Responde SOLO con un JSON válido, sin texto adicional, sin markdown.

Formato exacto:
[
  {
    "question": "Texto de la pregunta",
    "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
    "correctIndex": 0
  }
]

Reglas:
- correctIndex indica cuál opción es la correcta (0-3)
- Cada pregunta debe tener exactamente 4 opciones
- Las preguntas deben basarse DIRECTAMENTE en el contenido del archivo
- Varía entre comprensión, conceptos clave y aplicación`,
  };

  const filePart = {
    inlineData: {
      mimeType,
      data: base64Data,
    },
  };

  const text = await callGemini([textPart, filePart]);
  return parseJSON(text);
}
