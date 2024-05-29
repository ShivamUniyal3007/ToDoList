import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js"
import TodoModel from './models/todo.model.js'
dotenv.config();
import cors from 'cors'
mongoose.connect(process.env.MONGO)
.then(()=>{console.log("mongodb is connected")})
.catch(err=>{
    console.log(err);
})
const app = express();
app.use(cors())
app.use(express.json());

app.listen(3000,()=>{
    console.log("sever running on port 3000")
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/todo',todoRoutes);

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err));
})
app.post('/add',(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    TodoModel.create({
        title:title,
        description:description
    }).then(result=>res.json(result))
    .catch(err=>console.log(err));
})

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  TodoModel.findByIdAndUpdate(
    id,
    { title, description },
    { new: true } 
  )
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});


app.delete('/delete/:id', (req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
})
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';n
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});
