import {asyncHandler} from "../utils/asyncHandlers.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";



const generateAccessTokenAndRefreshToken= async(userId)=>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.refreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken,refreshToken}


    }catch(error){
        throw new ApiError(500,"Something went wrong while generating tokens")

    }
}
 
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


const loginUser = asyncHandler( async (req,res)=>{
    //req body-> data
    //username or email
    //find user
    //check the password
    //access and refresh token
    //send cookies

    const {email, username, password} = req.body

    if(!username & !email){
        throw new ApiError(400 ,"username or email required")
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User not Found")
    }

    const isPasswordValid= await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(404,"Invalid Credentials")
    }

    const {accessToken,refreshToken} = await generateAccessTokenAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{
            user:loggedInUser,accessToken,refreshToken
        },
        "User Logged In Successfully"
    )
    )
})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearcookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User logged Out Succesfully")
    )
})

export {
    registerUser,
    loginUser,
    logoutUser
}