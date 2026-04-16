import { GoogleGenerativeAI } from "@google/generative-ai";

export async function onRequest(context) {
  const genAI = new GoogleGenerativeAI(context.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  });

  const result = await model.generateContent("Explain how AI works in a few words");

  return new Response(result.response.text(), {
    headers: { "Content-Type": "text/plain" }
  });
}
