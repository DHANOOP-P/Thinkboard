import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config();
const PORT = process.env.PORT || 5001;
// const express= require("express");if package.json file has no type =module then use this kind of import
const app = express();

//connectDB();//we connect db first is better befor server run so we use aother method of doing with the server

//middleware
app.use(cors({ 
  origin:"http://localhost:5173",

}));
app.use(express.json());// this middleware will parse json bodies:req.body
app.use(rateLimiter);

//simple costum middleware
// app.use((req, res, next) => {
//    console.log(`req method is ${req.method} & req URL is ${req.url}`);
//    next();
// });



app.use("/api/notes", notesRoutes);
// api creation

// app.get("/api/notes",(req,res)=>{
//     res.status(200).send("you have 5 notes");

// })

// app.post("/api/notes",(req,res) =>{
//     res.status(201).json({message:"note creatyed successfully"})
// })  

// app.put("/api/notes",(req,res) =>{
//     res.status(200).json({message:"note updated successfully"})
// })

// app.delete("/api/notes",(req,res) =>{
//     res.status(200).json({message:"notes deleted successfully"})
// })

connectDB().then(()=>{
app.listen(PORT, () => {
   console.log("the server started on PORT:", PORT);
 });
});


//  