import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("Hello from CircuitAI!");
    console.log(result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

testGemini();
