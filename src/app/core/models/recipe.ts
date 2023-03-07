import { recipeBlock } from "./recipe-block";

export interface Recipe {
    docId?: string,
    bookId?:String,
    title: string,
    duration: number,
    process: recipeBlock[],
    ingredients: recipeBlock[],
}