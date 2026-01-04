const mongoose=require("mongoose")

const medicalrecSchema=new mongoose.Schema({},{timestamps:ture})

export const MedicalRec=mongoose.model("MedicalRec",medicalrecSchema)