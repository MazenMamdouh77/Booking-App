const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true, minlength: [6,"Password must be at least 6 characters long"]},
    email: { type: String, required: true, unique: true},
    isAdmin: {type: Boolean, default: false}
},
{
    timestamps: true
})


module.exports = mongoose.model("User",userSchema)