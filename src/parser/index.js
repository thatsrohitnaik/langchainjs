import {StringOutputParser, StructuredOutputParser} from "@langchain/core/output_parsers";
import {z} from "zod";

export const getStringParser = () =>{
    return new StringOutputParser();
}

export const getMovieParser = () =>{

    return StructuredOutputParser.fromZodSchema(
        z.object({
            movie: z.string().describe("name of the movie"),
            characters: z.array(z.string().describe("name of the character"))
        })
    )
}

export const getUserParser = () =>{
    return StructuredOutputParser.fromNamesAndDescriptions({
        name: "the name of the person",
        age: "the age of the person",
    })

}