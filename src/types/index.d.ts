import { Interface } from "readline";
import { User } from "../models/user";

export interface IAuthSignup {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string
}

export interface IAuthLogin {
    email: string,
    password: string
}

export interface IMail {
    subject: string,
    to: string,
    data: object,
    template: string
}