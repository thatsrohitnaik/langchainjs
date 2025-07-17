import  * as dotenv from  'dotenv';
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0
});

const prompt = ChatPromptTemplate.fromTemplate(
    "You are a nutritionist. Tell the nutrient content of the following item {input}")

const stringparser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(stringparser);

const response = await chain.invoke({input: "fish"})

console.log(response)
