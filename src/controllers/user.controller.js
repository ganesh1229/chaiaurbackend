import {asyncHandler} from "../utils/asyncHandlers.js";
 
const registerUser= asyncHandler( async (req,res) => {
    return res.status(200).json({
        message:"chai aur code"
    })
} )

export default registerUser