import mongoose from 'mongoose';


const TodoSchema = new mongoose.Schema(
  {
    title:String,
    description:String,
    userId:String,
    new:{
      type:Boolean,
      default:false
    }
  }
);

const TodoModel = mongoose.model('todos', TodoSchema);

export default TodoModel;