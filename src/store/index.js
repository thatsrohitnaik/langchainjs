import {GoogleGenerativeAIEmbeddings} from "@langchain/google-genai";
import {MemoryVectorStore} from "langchain/vectorstores/memory";

export const getVectorStore = async(splitDoc) => {
    const embedding = new GoogleGenerativeAIEmbeddings();
    return await MemoryVectorStore.fromDocuments(splitDoc, embedding)
}