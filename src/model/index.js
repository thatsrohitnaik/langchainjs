import  * as dotenv from  'dotenv';
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
dotenv.config();

export const modelGemini = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0
});