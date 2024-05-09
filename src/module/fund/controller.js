import moment from "moment";
import sendResponse from "../../util/send-response.js";
import fundModel from "./model.js";
import mongoose from "mongoose";

export const getFundsByCurrentMonth = async (req, res) => {
    try {
        let firstDate = moment().startOf('month').format('YYYY-MM-DD');
        let lastDate = moment().endOf('month').format('YYYY-MM-DD');

        const getFundsByCurrentMonthQuery = await fundModel.find({ date: { $gte: new Date(firstDate), $lte: new Date(lastDate) } });

        if (getFundsByCurrentMonthQuery.length < 1) {
            return sendResponse(res, "success", "No fund found in current month.");
        }

        return sendResponse(res, "success", "All fund by current month fetched successfully.", getFundsByCurrentMonthQuery);
    } catch (error) {
        return sendResponse(res, "failed", "All fund by current month fetched failed.", undefined, error);
    }
}

export const insertFund = async (req, res) => {
    try {
        const { memberid, date, fund } = req.body;

        const getFundsByDateQuery = await fundModel.find({ $expr: { $and: [{ $eq: [memberid, mongoose.Types.ObjectId(memberid).toString()] }, { $eq: [memberid, mongoose.Types.ObjectId(memberid).toString()] }, { $eq: [{ $month: new Date(date) }, moment(date).month() + 1] }] } });

        if (getFundsByDateQuery.length < 1) {
            return sendResponse(res, "success", "Fund already added in current month.");
        }

        const fundM = new fundModel({
            memberid,
            date,
            fund
        });

        await fundM.save();

        return sendResponse(res, "success", "Fund added successfully.", fundM);
    } catch (error) {
        return sendResponse(res, "failed", "Fund added failed.", undefined, error);
    }
}