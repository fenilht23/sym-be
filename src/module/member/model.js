import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    isactive: Boolean
});

const model = mongoose.model("member", schema);

export default model;