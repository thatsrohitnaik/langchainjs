import {modelGemini as model} from "./model/index.js";
import {promptQA as prompt} from "./prompt/index.js";
import {createStuffDocumentsChain} from "langchain/chains/combine_documents";
import {createRetrievalChain} from "langchain/chains/retrieval";
import {getWebDoc} from "./doc/index.js";
import {getWebDocSplit} from "./splitter/index.js";
import {getVectorStore} from "./store/index.js";
import {getRetriever} from "./retriever/index.js";

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

const response = await retrieverChain.invoke({
    input: "What is Cheerio",
})

console.log(response)