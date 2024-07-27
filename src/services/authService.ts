import { User } from "../models/user";
import { IAuthLogin, IAuthSignup } from "../types";
import { comparePassword, generateAccessToken, generateNumericOTP, hashPassword, } from "../utils"
import { HttpError, Conflict, ResourceNotFound } from "../middlewares";
import config from "../configs";
import jwt from "jsonwebtoken"
import { sendMail } from "../utils/mail";

export class AuthService {

    public async signup(payload:IAuthSignup){

        const {firstname, lastname, email, password, phone} = payload;

        try{
            const userExist = await User.findOne({where:{email}})
        
            if(userExist){
                throw new Conflict("User already exist!")
            }

            const hashedPassword = await hashPassword(password)
            const otp = generateNumericOTP(6);
            const otp_expires = new Date(Date.now() + 10 * 60 * 1000);

            const user = new User();
            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;
            user.password = hashedPassword;
            user.phone = phone;
            user.otp = parseInt(otp);
            user.otp_expires_at = otp_expires;

            const createdUser = await user.save()

            const { password: _, ...rest } = createdUser;
            const access_token = jwt.sign({ userId: createdUser.id }, config.JWT_SECRET, { expiresIn: "1d",});
            const emailData = {
                user: user.firstname,
                otp: user.otp
            }

            const mailSent = await sendMail({
                subject: "Activate your account",
                to: user.email,
                data: emailData,
                template: "activation.ejs"

            });

            return {mailSent, newUser: rest, access_token};
        }
        catch(error){
            console.error('Error during registration:', error);
            if (error instanceof HttpError) {
                throw error;
              }
              throw new HttpError(error.status || 500, error.message || error);
            }
    }

    public async login(payload: IAuthLogin): Promise<{token: string, user: Partial<User> }>{

        const {email, password} = payload;
        try{
            const user = await User.findOne({where: {email}});

            if (!user){
                throw new HttpError(404, "User does not exist!")
            }

            const isValidPwd = await comparePassword(password, user.password);

            if(!isValidPwd){
                throw new HttpError(401, "Invalid credentials")
            }

            const token = jwt.sign({userId: user.id}, config.JWT_SECRET, {expiresIn: "1d"})
            const {password: _, ...user_details} = user

            return {token, user: user_details};
        }
        catch(error){
            throw new HttpError(error.statusCode || 500, error.message || error)
        }
    }
};