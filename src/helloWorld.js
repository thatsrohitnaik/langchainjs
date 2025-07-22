import  {modelGemini as model} from "./model/index.js";

const res = await model.invoke("hello gemini, do you remember me?")

console.log(res)
