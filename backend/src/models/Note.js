import mongoose from "mongoose"

// first ste u need to create schema 
// 2 nd step you need to create a model based off of that schema 
const noteSchema= new mongoose.Schema(
    {
        title: {
            type: String,
            required : true,
        },
        content:{
            type: String,
            required : true,
        },
    },
    {timestamps: true} // createdAt,updatedAt
);

const Note = mongoose.model("Note",noteSchema);

export default Note;