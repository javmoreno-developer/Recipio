export interface recipeBlock {
    blockId: number,
    title:string,
    content: recipeBlockContent
}
export interface recipeBlockContent {
    text: string,
    image?: string,
}