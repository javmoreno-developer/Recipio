import { Block } from "./block";

export interface Recipe {
    docId?: string,
    bookId?:String,
    title: string,
    duration: string,
    process: Block[],
    ingredients: Block[],
}