import express from "express";
import { Request, Response } from "express";
import userRouter from "./routers/user";
import config from "./configs"
import AppDataSource from "./data-source"

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.use("/api/v1", userRouter)

const startServer = async () => {
    try {
      // Initialize the data source
      await AppDataSource.initialize();
  
      console.log("Database connected successfully");
  
      // Start the Express server
      app.listen(config.PORT, ()=>{
        console.log("server is running, don't ask for port")
    })
    } catch (error) {
      console.error("Error connecting to the database", error);
      process.exit(1);  // Exit the process with failure code
    }
  };
  
startServer();
