import dotenv from "dotenv";

dotenv.config();

const config = {
    DB_USER: process.env.DB_USERNAME,
    DB_PWD: process.env.DB_PWD,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: Number(process.env.DB_PORT),

    PORT: Number(process.env.PORT),

}

export default config;