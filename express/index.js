
require('dotenv').config()
const exp=require("express")
const app=exp()
const port = 3001

app.get('/',(req,res)=>{
    res.send('hello world')
})
app.get('/login',(req,res)=>{
    res.send('Login page ')
})
app.listen(process.env.PORT,()=>{
    console.log(`server listening at http://localhost:${port}`)
})