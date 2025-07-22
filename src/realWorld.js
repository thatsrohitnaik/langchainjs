import {modelGemini as model} from "./model/index.js";
import {promptQA as prompt} from "./prompt/index.js";
import {createStuffDocumentsChain} from "langchain/chains/combine_documents";
import {getWebDoc} from "./doc/index.js";

const chain = await createStuffDocumentsChain({
    llm:model,
    prompt: prompt
})

const doc = await getWebDoc("https://js.langchain.com/docs/integrations/document_loaders/web_loaders/web_cheerio/")

const response = await chain.invoke({
    input: "What is Cheerio",
    context: doc
})

console.log(response)
