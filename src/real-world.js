import  * as dotenv from  'dotenv';
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {Document} from "@langchain/core/documents"
import {createStuffDocumentsChain} from "langchain/chains/combine_documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0
});

const documentA = new Document({
    pageContent: "Pie is a very delicious fruit! only found in Kundaim forest"
})


const prompt = ChatPromptTemplate.fromTemplate("" +
    "Answer users question. " +
    "Content: {context}" +
    "Question : {input}")

//const chain = prompt.pipe(model);

const chain = await createStuffDocumentsChain({
    llm:model,
    prompt: prompt
})

const loader = new CheerioWebBaseLoader("https://js.langchain.com/docs/integrations/document_loaders/web_loaders/web_cheerio/")
const doc = await  loader.load()

const response = await chain.invoke({
    input: "What is Cheerio",
    context: doc
})

console.log(response)
