
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function callGemini(parts) {
  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.log("[GEMINI] API error:", err);
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

export async function generateQuizFromTopic(topicName, difficulty, numQuestions = 5) {
  const difficultyMap = {
    facil: "básico",
    medio: "intermedio",
    dificil: "avanzado",
  };

  const prompt = `Eres un profesor experto. Genera exactamente ${numQuestions} preguntas de opción múltiple sobre "${topicName}" con dificultad ${difficultyMap[difficulty] || difficulty}.

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
- Las preguntas deben ser claras y precisas
- Varía entre conceptos, cálculos y ejemplos prácticos`;

  const text = await callGemini([{ text: prompt }]);
  return parseJSON(text);
}

export async function generateQuizFromFile(fileContent, fileName, numQuestions = 5) {
  const prompt = `Eres un profesor experto. A continuación recibirás contenido de un archivo llamado "${fileName}". 

Basándote en ESTE CONTENIDO, genera exactamente ${numQuestions} preguntas de opción múltiple para evaluar el conocimiento del estudiante.

CONTENIDO DEL ARCHIVO:
${fileContent.substring(0, 8000)}

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
- Varía entre comprensión, conceptos clave y aplicación`;

  const text = await callGemini([{ text: prompt }]);
  return parseJSON(text);
}

export async function generateQuizFromImage(base64Data, fileName, numQuestions = 5) {
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
