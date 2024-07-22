import "reflect-metadata"
import { DataSource } from "typeorm"
import config from "./configs"



const AppDataSource = new DataSource({
    type: "mysql",
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PWD,
    database: config.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/modules/**/*.ts"],
    migrations: [],
    subscribers: [],
    ssl: false,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
})


export default AppDataSource;