import mongoose,{Schema} from "mongoose";

const subsciptionSchema=new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,//one who is subscribing
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId,//one who is subscribing 
        ref:"User"
    }
},{Timestamps:true})

export const Subscription = mongoose.model("Subscription",subscriptionSchema)