import * as dotenv from 'dotenv';

dotenv.config();

import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {StructuredOutputParser} from "@langchain/core/output_parsers";
import  {z} from "zod"


const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0
});

const prompt = ChatPromptTemplate.fromTemplate(
    "Extract information from following phrase." +
    "Formating Instruction : {format_instruction}" +
    "Phrase : {phrase}"
)

const outputparser = StructuredOutputParser.fromZodSchema(
    z.object({
        movie: z.string().describe("name of the movie"),
        characters: z.array(z.string().describe("name of the character"))
    })
)



const chain = prompt.pipe(model).pipe(outputparser);

const response = await chain.invoke(
    {
        phrase: "In the movie Star Wars, important characters are Luke, Liea, Yoda, Han, Dart",
        format_instruction: outputparser.getFormatInstructions()
    })

console.log(response)
