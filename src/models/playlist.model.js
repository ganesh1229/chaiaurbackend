import mongoose,{Schema} from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggreagate-paginate-v2";

const playListSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        videos:[
            {
                type:Schema.Types.ObjectId,
                ref:"video"
            }

        ],
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }

    },{timestamps:true}
)


playListSchema.plugin(mongooseAggregatePaginate);

export const PlayList=mongoose.model("PlayList",playListSchema)
