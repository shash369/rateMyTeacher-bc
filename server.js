import express from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import {connectDB} from "./db/db.js";

const app=express();
app.use(cors({
    origin:"*"
}));

connectDB().
then(()=>{
   app.listen(process.env.PORT||8000,()=>{
     console.log("app is listining at port 8000") ;
   })
   app.get('/postman',(req,res)=>{
    res.send("hello postman sucessfull connection")
   })
   
}).catch((err)=>{
    console.log("database connection error"+err);
    
})
