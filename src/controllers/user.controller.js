import {asyncHandler} from "../utils/asyncHandlers.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

 
const registerUser= asyncHandler( async (req,res) => {
    //get user details
    //validation-not empty
    //check if user already exits:username or email
    //check for images
    //check for avatar
    //upload images/avatar to cloudinary,check avatar
    //create user object-creation call
    //remove password and refreshtoken fields from response
    //check for user creation 
    //return user or error

    const {fullname, email, username, password}= req.body
    if (
        [fullname, email, username, password].some((field)=>
            field?.trim()===""
        )
    ){
        throw new ApiError(400,"All fields are required")
    }
    const existUser= await User.findOne({
        $or:[{username},{email}]
    })

    if (existUser){
        throw new ApiError(409,"user with email or username already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path
    const coverImageLocalPath=req.files?.coverImage[0]?.path
    if (!avatarLocalPath){
        throw new ApiError(400,"Avatar File is Required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar upload failed")
    }

    const user= await User.create({
        fullname,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser= await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser){
        throw new ApiError(500,"Something went wrong while regrestering")

    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Succesfully")
    )

} )

export default registerUser