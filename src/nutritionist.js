import {modelGemini as model} from "./model/index.js";
import {promptNutritionist as prompt} from "./prompt/index";

const chain = prompt.pipe(model);

const response = await chain.invoke({input: "apple"})

console.log(response)
