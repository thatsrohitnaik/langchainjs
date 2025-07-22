import {modelGemini as model} from "./model/index.js";
import {promptExtarctInfo as prompt} from "./prompt/index.js";
import {getUserParser} from "./parser/index.js";

const chain = prompt.pipe(model).pipe(getUserParser());

const response = await chain.invoke(
    {
        phrase: "Rohit is 24 years old, i an alternate universe",
        format_instruction: outputparser.getFormatInstructions()
    })

console.log(response)
