import * as dotenv from 'dotenv';

dotenv.config();

import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {StringOutputParser, StructuredOutputParser} from "@langchain/core/output_parsers";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0
});

const prompt = ChatPromptTemplate.fromTemplate(
    "Extract information from following phrase." +
    "Formating Instruction : {format_instruction}" +
    "Phrase : {phrase}"
)

const outputparser = StructuredOutputParser.fromNamesAndDescriptions({
    name: "the name of the person",
    age: "the age of the person",
})

const chain = prompt.pipe(model).pipe(outputparser);

const response = await chain.invoke(
    {
        phrase: "Rohit is 24 years old, i an alternate universe",
        format_instruction: outputparser.getFormatInstructions()
    })

console.log(response)
