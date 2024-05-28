import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{console.log("mongodb is connected")})
.catch(err=>{
    console.log(err);
})
const app = express();
app.use(express.json());

app.listen(3000,()=>{
    console.log("sever running on port 3000")
})

