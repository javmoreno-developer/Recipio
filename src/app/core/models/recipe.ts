import { Block } from "./block";

export interface Recipe {
    title: string,
    duration: string,
    process: Block[],
    ingredients: Block[],
}