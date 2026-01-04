const mongoose=require("mongoose")

const hospitalSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        addressline1:{
            type:String,
            required:true
        },
        addressline2:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true
        },
        specialisation:[
            {
                type:String,
            },
        ],
    },{timestamps:ture})

export const Hospital=mongoose.model("Hospital",hospitalSchema)