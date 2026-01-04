const asynchandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).catch((error)=>
            next(error))
    }
}

export {asynchandler}

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