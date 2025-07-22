import {modelGemini as model} from "./model/index.js";
import {promptNutritionist as prompt} from "./prompt/index.js";
import {getStringParser} from "./parser/index.js";

const chain = prompt.pipe(model).pipe(getStringParser());

const response = await chain.invoke({input: "fish"})

console.log(response)
