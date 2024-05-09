import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import mongoose from "mongoose";
import sendResponse from "./util/send-response.js";
import memberRoute from "./module/member/route.js";

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(fileupload());

app.get("/", (req, res) => {
    return sendResponse(res, "success", "Server is running.");
});

app.use("/member", memberRoute);

app.listen(
    process.env.SERVER_PORT,
    () => {
        console.log(`🚀 Server is running on port: ${process.env.SERVER_PORT}`);

        mongoose.connect(
            process.env.MONGO_URL
        )
            .then(
                console.log("MongoDB connected.")
            )
            .catch(
                error => console.log({
                    message: "MongoDB connection failed.",
                    error
                })
            );
    }
)