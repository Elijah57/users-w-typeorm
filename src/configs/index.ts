import dotenv from "dotenv";

dotenv.config();

const config = {
    HOST: process.env.HOST,
    DB_USER: process.env.DB_USERNAME,
    DB_PWD: process.env.DB_PWD,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: Number(process.env.DB_PORT),

    PORT: Number(process.env.PORT),
    JWT_SECRET: process.env.JWT_SECRET,


    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    SMTP_SERVICE: process.env.SMTP_SERVICE,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_MAIL: process.env.SMTP_MAIL

}

export default config;