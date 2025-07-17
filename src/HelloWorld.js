import  * as dotenv from  'dotenv';
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0
});
const res = await model.invoke("hello gemini, do you remember me?")

console.log(res)
