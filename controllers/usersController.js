const mongoose = require("mongoose")
const User = require("../models/usersModel.js")
const asyncHandler = require("express-async-handler")


const CurrentUser = asyncHandler(async(req,res)=>{
    const data = req.user
    if(!data){
        res.status(401).json({message:"Please login to access this feature"})
    }
    res.status(200).json({
        message:"Current User Details",
        user: data   
    })
})

const UpdateUser = asyncHandler( async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true} )
        if(!updatedUser){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})

const GetUser = asyncHandler(async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})

const GetAll = asyncHandler(async(req,res)=>{
    try{
        const users = await User.find()
        if (users.length === 0) {
            return res.status(200).json({ message: "No Users found", users: [] });
        }
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json(err)
    }
})

const DeleteUser = asyncHandler(async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser){
            return res.status(404).json("User not found")
        }
        res.status(200).json({message:"User Has Been Deleted Successfully"})
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = {CurrentUser,UpdateUser, GetUser, GetAll, DeleteUser}