const mongoose=require("mongoose")

const doctorSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        salary:{
            type:String,
            required:true
        },
        qualifiaction:{
            type:String,
            required:true
        },
        experience:{
            type:Number,
            default:0
        },
        worksinHospitals:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Hospital",
            },
        ],
    },{timestamps:ture})

export const Doctor=mongoose.model("Doctor",doctorSchema)