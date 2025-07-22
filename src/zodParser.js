import {modelGemini as model} from "./model/index.js";
import {promptExtarctInfo as prompt} from "./prompt/index.js";
import {getMovieParser} from "./parser/index.js";

const chain = prompt.pipe(model).pipe(getMovieParser());

const response = await chain.invoke(
    {
        phrase: "In the movie Star Wars, important characters are Luke, Liea, Yoda, Han, Dart",
        format_instruction: outputparser.getFormatInstructions()
    })

console.log(response)
