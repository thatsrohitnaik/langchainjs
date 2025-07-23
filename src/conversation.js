import {modelGemini as model} from "./model/index.js";
import {promptQAHistory as prompt} from "./prompt/index.js";
import {createStuffDocumentsChain} from "langchain/chains/combine_documents";
import {createRetrievalChain} from "langchain/chains/retrieval";
import {getWebDoc} from "./doc/index.js";
import {getWebDocSplit} from "./splitter/index.js";
import {getVectorStore} from "./store/index.js";
import {getRetriever} from "./retriever/index.js";
import {AIMessage, HumanMessage} from "@langchain/core/messages";

const chain = await createStuffDocumentsChain({
    llm:model,
    prompt: prompt
})

const doc = await getWebDoc("https://js.langchain.com/docs/integrations/document_loaders/web_loaders/web_cheerio/")

const splitDoc = await getWebDocSplit(doc)

const vectorStore = await getVectorStore(splitDoc)

const retriever = getRetriever(vectorStore);

const retrieverChain = await createRetrievalChain({
    combineDocsChain: chain,
    retriever: retriever
})

const chatHistory = [
    new HumanMessage("Hello"),
    new AIMessage("Hi, how can i help you?"),
    new HumanMessage("My name is Rohit"),
    new AIMessage("Hi, Rohit how can i help you today?"),
    new HumanMessage("What is Star Wars"),
    new AIMessage("Star Wars, is a Hollywood movie series.")];

const response = await retrieverChain.invoke({
    input: "What is my name",
    chat_history: chatHistory
})

console.log(response)