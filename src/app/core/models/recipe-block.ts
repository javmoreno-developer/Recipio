export interface recipeBlock {
    title:string,
    content: recipeBlockContent
}
export interface recipeBlockContent {
    text: string,
    image?: string,
}