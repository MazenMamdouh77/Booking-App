const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    title:{ type: String,required: true},
    description:{ type: String,required: true},
    price:{ type: Number,required: true},
    maxPeople:{type: Number,required: true},
    roomNumber:[{type: Number,unavailableDates:{type: [Date]}, unique: true}]
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Room", roomSchema);