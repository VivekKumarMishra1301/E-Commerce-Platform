import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        
    },
    role: {
        type: Number,
        default:0,
        required: true,
    },
    question: {
        type: String,
    }
}, { timestamps: true });
export default mongoose.model('users',userSchema)