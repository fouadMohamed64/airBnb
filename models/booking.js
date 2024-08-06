
import mongoose from "mongoose";



let todoSchema = mongoose.Schema({
            title: {
                        type: String,
                        required: true,
                        minLength: 5,
                        maxLength: 20
            },
            status: {
                        type: String,
                        enum: ['todo', 'in_progress', 'done'],
                        default: "todo",
            }})
let TodosModel = mongoose.model("todo", todoSchema)
export default TodosModel

// updated by fouad