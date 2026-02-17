import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./models/db.js";
import cookieParser from "cookie-parser";
import router from "./Routes/authRouter.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

await connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})