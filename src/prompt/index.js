import {ChatPromptTemplate} from "@langchain/core/prompts";

export const promptQA = ChatPromptTemplate.fromTemplate("" +
    "Answer users question. " +
    "Content: {context}" +
    "Question : {input}"
)

export const promptNutritionist = ChatPromptTemplate.fromTemplate(
    "You are a nutritionist. Tell the nutrient content of the following item {input}")


export const promptExtarctInfo =  ChatPromptTemplate.fromTemplate(
    "Extract information from following phrase." +
    "Formating Instruction : {format_instruction}" +
    "Phrase : {phrase}"
)