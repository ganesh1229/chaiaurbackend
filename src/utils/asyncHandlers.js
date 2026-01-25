const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((error)=>
            next(error))
    }
}

export {asyncHandler}

// const aynchandler=(fn)=> async (req,resizeBy,next)=>{
//     try{
//         await fn(req,res,next)

//     }catch(error){
//         res.status(error.code || 500).json({
//             sucess:false,
//             message:error.message
//         })
//     }
// }
