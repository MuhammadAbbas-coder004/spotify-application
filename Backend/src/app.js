import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js"
import musicRouter from "./routes/music.routes.js";






const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);   
app.use("/api/music", musicRouter)





export default app;