const exp=require("express")
const userapp=exp.Router()

userapp.use(exp.json())

let users=[
    {
        name:'user1',
        id:1
    },
    {
        name:'user2',
        id:2
    }
]

userapp.get('/getusers',(req,res)=>{
    res.send({message:"all users",payload:users})
})
userapp.get('/getusers/:id',(req,res)=>{
    let userid=(+req.params.id)
    let userobj=users.find(userobj=>userobj.id==userid)
    if (userobj==undefined){
        res.send({message:"user not found"})

    }
    else{
        res.send({message:"user found",payload:userobj})
    }
})

userapp.post('/create-user',(req,res)=>{
    let usergot=req.body
    users.push(usergot)
    console.log(users)
})

userapp.put('/update-user',(req,res)=>{
    let userupdate=req.body
    console.log(userupdate)
    users.forEach( user=>{
        if(userupdate.id===user.id){
            user.name=userupdate.name
            res.send(users)
             
        }
    }) 
})

userapp.delete('/remove-user/:id',(req,res)=>{
    let userid=(+req.params.id)
    users=users.filter(user=>user.id!==userid)
    res.send(users)
})

module.exports=userapp