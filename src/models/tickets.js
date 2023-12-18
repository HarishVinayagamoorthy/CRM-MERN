import mongoose from "mongoose";
import { Status } from "../common/utils.js";



const ticketSchema = new mongoose.Schema({
    title:{type:String,required:[true,"Title is required"]},
    imageUrl:{type:String,required:[true,"Image url is required"]},
    description:{type:String,required:[true,"Description is required"]},
    status:{type:String,default:Status.PENDING},
    createdBy:{type:String,required:[true,"Created By is required"]},
    approvedBy:{type:String},
    modifiedAt:{type:Date},
    rejectedBy:{type:String},
    reason:{type:String,default:""},
    createdAt:{type:Date, default:Date.now()}
},{
    collection:'tickets',
    versionKey:false
})

const ticketModel = mongoose.model('tickets',ticketSchema)
export default ticketModel