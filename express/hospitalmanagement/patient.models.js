const mongoose=require("mongoose")

const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    diagnosedwith:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    bloodgroup:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["M","F","O"],
        reuired:true
    },
    admittedin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
    }

},{timestamps:ture})

export const Patient=mongoose.model("Patient",patientSchema)