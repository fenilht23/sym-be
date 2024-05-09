import express from "express";
import sendResponse from "../../util/send-response.js";
import { getFundsByCurrentMonth } from "./controller.js";

const route = express.Router();

route
    .get("/", (req, res) => {
        return sendResponse(res, "success", "Fund routes fetched successfully.")
    })
    .get("/get-funds-by-current-month", getFundsByCurrentMonth)

export default route;