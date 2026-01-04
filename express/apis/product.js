const exp=require("express")
const productapp=exp.Router()

productapp.use(exp.json())

productapp.use('/getproducts',(req,res)=>{
    res.send({message:"Response for get products"})
})

productapp.use('/createproducts',(req,res)=>{
    res.send({message:"Response for create products"})
})

productapp.use('/updateproducts',(req,res)=>{
    res.send({message:"response for update user"})
})

module.exports=productapp