export interface User {
    uid:string;
    nickname:string;
    email:string;
    provider:string;
    token:string,
    surname:string,
    name:string
    picture: string,
}

export interface UserLogin{
    identifier:string,
    password:string
}

export interface UserRegister{
    email:string,
    password:string,
    nickname:string,
    surname:string,
    name:string
}