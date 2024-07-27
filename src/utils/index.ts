import * as bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../configs";

export async function hashPassword(password: string): Promise<string>{
    return await bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean>{
    return await bcrypt.compare(password, hashedPassword)
}

export const generateNumericOTP = (length: number): string => {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 9 + 1).toString();
    }
    return otp;
  };

export const generateAccessToken = async (userId: string) =>{
    return jwt.sign({userId}, config.JWT_SECRET, {expiresIn: "1d"})
}