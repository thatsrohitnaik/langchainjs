import {CheerioWebBaseLoader} from "@langchain/community/document_loaders/web/cheerio";
import {Document} from "@langchain/core/documents";

export const getWebDoc = async (url) => {
    const loader = new CheerioWebBaseLoader(url)
    return await  loader.load();
}

export const getDocument = async (data) => {
    return new Document({pageContent: data})
}