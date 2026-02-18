import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-3-flash-preview";

const model = genAI.getGenerativeModel({model: MODEL_NAME});

export default async function generateHint(problemTitle, level) {
    if (!problemTitle) throw new Error("Problem title is required for hint generator");
    if (!level) throw new Error("Hint level is required for hint generator");

    const prompt = `
    You are a competitive programming coach.
    Problem: "${problemTitle}"
    Level: ${level}
    
    Instructions:
    - If level is 'low': Provide a conceptual nudge.
    - If level is 'medium': Suggest a data structure.
    - If level is 'aggressive': Point toward the complexity/optimal strategy.
    
    Return ONLY the hint string. No JSON, no preamble.
    `;

    const result = await model.generateContent(prompt);

    console.log("Generated hint:", result.response.text().trim());
    return result.response.text().trim();
}