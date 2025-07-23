import {AIMessage, HumanMessage} from "@langchain/core/messages";

export const chatHistory = [
    new HumanMessage("Hello"),
    new AIMessage("Hi, how can i help you?"),
    new HumanMessage("My name is Rohit"),
    new AIMessage("Hi, Rohit how can i help you today?"),
    new HumanMessage("What is Star Wars"),
    new AIMessage("Star Wars, is a Hollywood movie series.")];
