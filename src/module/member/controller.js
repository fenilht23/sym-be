import sendResponse from "../../util/send-response.js"
import memberModel from "./model.js"

export const getAllMembers = async (req, res) => {
    try {
        const getAllMemberQuery = await memberModel.find({ isactive: true });
        
        if (getAllMemberQuery.length < 1) {
            return sendResponse(res, "success", "No member found.");
        }

        return sendResponse(res, "success", "All members fetched successfully.", getAllMemberQuery);
    } catch (error) {
        return sendResponse(res, "failed", "All members fetched failed.", undefined, error);
    }
}

export const getMemberById = async (req, res) => {
    try {
        const { memberid } = req.body;

        const getMemberByIdQuery = await memberModel.findOne({ _id: memberid });

        if (getMemberByIdQuery === null) {
            return sendResponse(res, "success", `No member found of id :- ${memberid}.`);
        }

        return sendResponse(res, "success", "Get member by id fetched successfully.", getMemberByIdQuery);
    } catch (error) {
        return sendResponse(res, "failed", "Get member by id fetched failed.", undefined, error);
    }
}

export const insertMember = async (req, res) => {
    try {
        const { name, phone, email } = req.body;

        const getMemberdetailsQuery = await memberModel.findOne({ name, phone, email, isactive: true });

        if (getMemberdetailsQuery !== null) {
            return sendResponse(res, "success", "Member is already added.");
        }
        const memberM = new memberModel({
            name,
            phone,
            email,
            isactive: true
        })


        await memberM.save();

        return sendResponse(res, "success", "Member added successfully.", memberM);
    } catch (error) {
        return sendResponse(res, "failed", "Member added failed.", undefined, error);
    }
}

export const updateMemberById = async (req, res) => {
    try {
        const { memberid, name, phone, email, isactive } = req.body;

        const getMemberByIdQuery = await memberModel.findOne({ _id: memberid });

        if (getMemberByIdQuery === null) {
            return sendResponse(res, "success", `No member found of id :- ${memberid}.`);
        }

        const memberM = {
            name: name || getMemberByIdQuery.name,
            phone: phone || getMemberByIdQuery.phone,
            email: email || getMemberByIdQuery.email,
            isactive: isactive || getMemberByIdQuery.isactive
        }
        await memberModel.updateOne({ _id: memberid }, { $set: memberM });

        return sendResponse(res, "success", "Member by id updated successfully.", memberM);
    } catch (error) {
        return sendResponse(res, "failed", "Member by id updated failed.", undefined, error);
    }
}