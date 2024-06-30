import dotenv from "dotenv";
dotenv.config();
import multer from 'multer';
import bodyParser from 'body-parser';
import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import cookieParser from "cookie-parser";
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import postRoute from "./src/features/post/post.routes.js"


dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/posts", postRoute);


app.use(appLevelErrorHandlerMiddleware);

export default app;
