import mongoose from "mongoose";

const schema = mongoose.Schema({
    memberid: String,
    date: Date,
    fund: Number
});

const model = mongoose.model("fund", schema);

export default model;