import express from "express";
import sendResponse from "../../util/send-response.js";
import { getAllMembers, getMemberById, insertMember, updateMemberById } from "./controller.js";

const route = express.Router();

route
    .get("/", (req, res) => {
        return sendResponse(res, "success", "Member routes fetched successfully.")
    })
    .get("/get-all-members", getAllMembers)
    .post("/get-member-by-id", getMemberById)
    .post("/insert-member", insertMember)
    .post("/update-member-by-id", updateMemberById)

export default route;