import {User} from "../../modules/user"
import {Request, Response} from "express"

const register = async  (req:Request, res: Response)=>{

    const { firstname, lastname, email, password } = req.body;

    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;

    try{
        await user.save();
        res.status(201).json({status: true, message: "successful"})
        console.log(`${user.firstname} has been added to the database`)
    }catch(error){
        res.status(400).json({status: false, message: "Failed!"})
    }

}

export default register