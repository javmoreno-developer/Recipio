import { Block } from "./block";

export interface Recipe {
    docId?: string,
    bookId?:String,
    title: string,
    duration: number,
    process: Block[],
    ingredients: Block[],
}