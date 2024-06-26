import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import mongoose from "mongoose";
import sendResponse from "./util/send-response.js";
import memberRoute from "./module/member/route.js";
import fundRoute from "./module/fund/route.js";

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(fileupload());

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

app.get("/", (req, res) => {
    return sendResponse(res, "success", "Server is running.");
});

app.use("/member", memberRoute);
app.use("/fund", fundRoute);

app.listen(
    process.env.SERVER_PORT,
    () => console.log(`🚀 Server is running on port: ${process.env.SERVER_PORT}`)
)