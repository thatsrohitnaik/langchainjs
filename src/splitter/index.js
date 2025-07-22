import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";

export const getWebDocSplit = async (doc) => {

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize:200,
        chunkOverlap: 20
    })
    return await splitter.splitDocuments(doc);
}