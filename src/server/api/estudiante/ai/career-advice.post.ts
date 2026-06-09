import { GoogleGenAI } from "@google/genai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = process.env.GEMINI_API_KEY || config.public.geminiApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "GEMINI_API_KEY is not configured",
    });
  }

  const ai = new GoogleGenAI(apiKey);
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const body = await readBody(event);
    const { skills, interests } = body;

    const prompt = `Given my skills: ${skills.join(", ")} and interests: ${interests.join(", ")}, what 3 career paths should I explore? Provide a short reason for each.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { advice: text };
  } catch (error: any) {
    console.error("AI Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to get AI advice",
    });
  }
});
