const asyncHandler = require("express-async-handler")
const Room = require("../models/roomsModel")
const mongoose = require("mongoose")

const CreateRoom = asyncHandler(async(req,res)=>{
    const {title,description,price,maxPeople,roomNumber} = req.body
    if( !title|| !description|| !price|| !maxPeople|| !roomNumber){
        res.status(400).json({message:"Please Fill All Fields"})
    }
    const roomTaken = await Room.findOne({roomNumber})
    if(roomTaken){
        res.status(400).json({message:"Room number already taken"})
    }
    const room = await Room.create(req.body)
    const data = req.user
    if(!room){
        res.status(400).json({message:"Failed to Create Room"})
    }
    res.status(200).json({message:"Room Has Been Created Successfully",room , user:data})
    console.log(room)
})

const UpdateRoom = asyncHandler(async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id,req.body,{new:true})
    const data = req.user
    if(!updatedRoom){
        res.status(400).json({message:"Room Not Found"})
    }
    res.status(200).json({message:"Room Has Been Updated Successfully",updatedRoom, user:data})
    console.log(updatedRoom)
})

const DeleteRoom = asyncHandler(async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const deletedRoom = await Room.findByIdAndDelete(req.params.id)
    const data = req.user
    if(!deletedRoom){
        res.status(400).json({message:"Room Not Found"})
    }
    res.status(200).json({message:"Room Has Been Deleted Successfully", user:data})
})

const GetRoom = asyncHandler(async(req,res)=>{
    const {roomNumber}= req.params
    const data = req.user
    const room = await Room.findOne({roomNumber})
    if(!room){
        res.status(400).json({message:"Room Not Found"})
    }
    res.status(200).json({message:"Room Has Been Retrieved Successfully",room, user:data})
    console.log(room)
})

const GetAllRooms = asyncHandler(async(req,res)=>{
    const data = req.user
    const rooms = await Room.find()
    if(!rooms){
        res.status(400).json({message:"No Rooms Found"})
    }
    res.status(200).json({message:"All Rooms Have Been Retrieved Successfully",rooms,user:data})
    console.log(data)
    console.log(rooms)
})

module.exports={CreateRoom,UpdateRoom,DeleteRoom,GetRoom,GetAllRooms}