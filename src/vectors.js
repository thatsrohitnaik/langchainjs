import  * as dotenv from  'dotenv';
dotenv.config();
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {createStuffDocumentsChain} from "langchain/chains/combine_documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter} from "langchain/text_splitter"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore} from 'langchain/vectorstores/memory';
import {createRetrievalChain} from "langchain/chains/retrieval";


// Step 1 create model // duhh
const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0
});

// create a prompt use a prompt template to do so
// add context and question placeholders
const prompt = ChatPromptTemplate.fromTemplate("" +
    "Answer users question. " +
    "Content: {context}" +
    "Question : {input}")

// pipe the prompt and model to create a chain using weird function called createStuff
const chain = await createStuffDocumentsChain({
    llm:model,
    prompt: prompt
})

// Now use Cheerio to scrap data from website
const loader = new CheerioWebBaseLoader("https://js.langchain.com/docs/integrations/document_loaders/web_loaders/web_cheerio/")
const doc = await  loader.load()

// Now the document that we get is huge, so we need to vector it
// to vector it first it needs to be split to chunks
// that is done by splitter
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize:200,
    chunkOverlap: 20
})
// pass the doc object and get the splitdoc
const splitDoc = await splitter.splitDocuments(doc);

// now to vector we need two params, one is the split Doc chunks and the second is the embedding method provided by the respective llm
const embedding = new GoogleGenerativeAIEmbeddings();

// Now create the vector store local one
const vectorStore = await MemoryVectorStore.fromDocuments(splitDoc, embedding)

// now create a retriever that can be used to retrieve data from the store
const retriever = vectorStore.asRetriever({
    k:2,
})

// create retrieverChain by passing the original chain and the retriever
const retrieverChain = await  createRetrievalChain({
    combineDocsChain: chain,
    retriever: retriever
})


const response = await retrieverChain.invoke({
    input: "What is Cheerio",
})

console.log(response)
