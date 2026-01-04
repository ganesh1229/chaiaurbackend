const exp=require('express')
const app=exp()
const mclient=require("mongodb").MongoClient


//connection with mongodb atlas
const DBurl="mongodb+srv://ganesh1229:ganesh1229@cluster0.ox9ymzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//connecting mclient
mclient.connect(DBurl) 
.then((client)=>{
    //returns db object
    let dbobj=client.db("ganesh1229")

    //creating collections
    let usercollectionobj=dbobj.collection("usercollection")
    let productcollectionobj=dbobj.collection("productcollection")
    
    //sharing collection objects to apis
    app.set("usercollectionobj",usercollectionobj)
    app.set("productcollectionobj",productcollectionobj)

    console.log("DB connection success")})
.catch((e)=>{console.log("error in mclient mongodb",e)})


const UserApp=require('./apis/user.js')
const ProductApp=require('./apis/product.js')


app.use('/user-api',UserApp)
app.use('/product-api',ProductApp)

app.use((req,res)=>{
    res.send({message:"Invalid path"})

})


app.use((error,req,res,next)=>{
    res.send({message:"Error occured",reason:error.message})
})

app.listen(4000,()=>{console.log("server listening at port 4000")})