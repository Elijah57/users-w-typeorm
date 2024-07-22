import { Router } from "express";
import {register} from "../controllers/users";

const userRouter = Router();

userRouter.post("/register", register)

export default userRouter