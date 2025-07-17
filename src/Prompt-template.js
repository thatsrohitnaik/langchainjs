import  * as dotenv from  'dotenv';
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatPromptTemplate} from "@langchain/core/prompts";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0
});

const prompt = ChatPromptTemplate.fromTemplate("You are a nutritionist. Tell the nutrient content of the following item {input}")

const chain = prompt.pipe(model);

const response = await chain.invoke({input: "apple"})

console.log(response)
