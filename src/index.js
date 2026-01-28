import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
})

import connectDB from './db/index.js';
import { app } from './app.js';


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port :${process.env.PORT} `)
    })
})
.catch((err)=>{
    console.log("mongo db connection failed !!!",err);
})













/*import express from "express";
const app=express();
(async()=>{
    try{
        mongoose.connect(`${process.env.MONGODBURL}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }catch(error){
        console.error("ERROR :", error);
        throw error;
    }
})()*/


