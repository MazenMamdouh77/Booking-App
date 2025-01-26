const mongoose = require("mongoose")
const Hotel = require("../models/hotelsModel.js")
const asyncHandler = require("express-async-handler")


const CreateHotel = asyncHandler( async(req,res)=>{
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json({
            message:"Hotel Has Been Created Successfully",
            hotel: savedHotel
        })
    }
    catch(err){
        res.status(500).json(err)
    }
})

const UpdateHotel = asyncHandler( async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {new:true} )
        if(!updatedHotel){
            return res.status(404).json({message: "Hotel not found"})
        }
        res.status(200).json(updatedHotel)
    }
    catch(err){
        res.status(500).json(err)
    }
})

const GetHotel = asyncHandler(async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    try{
        const hotel = await Hotel.findById(req.params.id)
        if(!hotel){
            return res.status(404).json({message: "Hotel not found"})
        }
        res.status(200).json(hotel)
    }
    catch(err){
        res.status(500).json(err)
    }
})

const GetAll = asyncHandler(async(req,res)=>{
    try{
        const hotels = await Hotel.find()
        if (hotels.length === 0) {
            return res.status(200).json({ message: "No hotels found", hotels: [] });
        }
        res.status(200).json(hotels)
    }
    catch(err){
        res.status(500).json(err)
    }
})

const DeleteHotel = asyncHandler(async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        if(!deletedHotel){
            return res.status(404).json("Hotel not found")
        }
        res.status(200).json({message:"Hotel Has Been Deleted Successfully"})
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = { CreateHotel, UpdateHotel, GetHotel, GetAll, DeleteHotel}