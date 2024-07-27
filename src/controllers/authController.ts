import { AuthService } from "../services/authService";
import {NextFunction, Request, Response} from "express"


const authService = new AuthService();
export const register = async  (req:Request, res: Response, next: NextFunction)=>{

    try{
        const {mailSent, newUser, access_token} = await authService.signup(req.body)
        res.status(201).json({status: true, message: {mailSent, newUser, access_token}})
        console.log(`${newUser.firstname} has been added to the database`)
    }catch(error){
        next(error)
        // res.status(400).json({status: false, message: "Failed!"})
    }

}
