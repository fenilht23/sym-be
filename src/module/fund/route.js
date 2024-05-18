import express from "express";
import sendResponse from "../../util/send-response.js";
import { getFundsByCurrentMonth, getFundsByMonthYearAndMemberid, getTotalFunds, insertFund } from "./controller.js";

const route = express.Router();

route
    .get("/", (req, res) => {
        return sendResponse(res, "success", "Fund routes fetched successfully.")
    })
    .get("/get-total-funds", getTotalFunds)
    .get("/get-funds-by-current-month", getFundsByCurrentMonth)
    .post("/get-funds-by-month-year-memberid", getFundsByMonthYearAndMemberid)
    .post("/get-funds-by-month-year-memberid", insertFund)

export default route;