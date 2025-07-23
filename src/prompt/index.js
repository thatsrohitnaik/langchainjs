import {ChatPromptTemplate, MessagesPlaceholder} from "@langchain/core/prompts";

export const promptQA = ChatPromptTemplate.fromTemplate("" +
    "Answer users question. " +
    "Content: {context}" +
    "Question : {input}"
)

export const promptQAHistory = ChatPromptTemplate.fromMessages([

    ["system", "Answer users question based onn the following context: {context}."],
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"]
    ]
)

export const promptNutritionist = ChatPromptTemplate.fromTemplate(
    "You are a nutritionist. Tell the nutrient content of the following item {input}")


export const promptExtarctInfo =  ChatPromptTemplate.fromTemplate(
    "Extract information from following phrase." +
    "Formating Instruction : {format_instruction}" +
    "Phrase : {phrase}"
)