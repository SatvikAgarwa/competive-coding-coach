import { GoogleGenerativeAI } from "@google/generative-ai";

/* --------------------------------------------------
   Init Gemini Client
-------------------------------------------------- */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* --------------------------------------------------
   Constants
-------------------------------------------------- */
const MODEL_NAME = "gemini-3-flash-preview";

/* --------------------------------------------------
   Prompt Builder
-------------------------------------------------- */
function buildPrompt(title) {
    return `
You are a competitive programming problem generator.

Generate a JSON response for a coding problem with this title: "${title}"

Return strictly in this format:

{
  "title": "Clean corrected problem title",
  "description": "Detailed problem description...",
  "difficulty": "Easy | Medium | Hard",
  "topics": ["array", "binary search"],
  "constraints": {
    "nRange": "1 <= n <= 10^5",
    "valueRange": "-10^9 <= arr[i] <= 10^9"
  }
}
`;
}

/* --------------------------------------------------
   Extract JSON safely from AI text
-------------------------------------------------- */
function extractJSON(text) {
    if (!text) throw new Error("Empty AI response");

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON object found in AI response");

    try {
        return JSON.parse(match[0]);
    } catch {
        throw new Error("Invalid JSON format from AI");
    }
}

/* --------------------------------------------------
   Beautify + Normalize AI Output
-------------------------------------------------- */
function normalizeProblem(data) {
    return {
        title: String(data.title || "").trim(),
        description: String(data.description || "").trim(),
        difficulty: data.difficulty || "Medium",
        topics: Array.isArray(data.topics) ? data.topics : [],
        constraints: {
            nRange: data?.constraints?.nRange || "",
            valueRange: data?.constraints?.valueRange || ""
        }
    };
}

/* --------------------------------------------------
   Main Generator Function
-------------------------------------------------- */
export async function generateProblem(title) {
    try {
        if (!title || typeof title !== "string") {
            throw new Error("Invalid title input");
        }

        const model = genAI.getGenerativeModel({
            model: MODEL_NAME,
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const result = await model.generateContent(buildPrompt(title));
        const response = await result.response;
        const text = response.text();

        const parsed = extractJSON(text);
        const formatted = normalizeProblem(parsed);

        return formatted;

    } catch (err) {
        console.error("AI generation error:", err.message);
        throw new Error("AI_GENERATION_FAILED");
    }
}
