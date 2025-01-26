const User = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const register = asyncHandler(async(req,res)=>{
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please Fill In All Fields" });
    }
    try{
        const usernameExist = await User.findOne({username})
        if(usernameExist){
            throw new Error("Username Already Exists")
        }
        const emailExist = await User.findOne({email})
        if(emailExist){
            throw new Error("Email Already Exists")
        }
        const hashedPassword = await bcrypt.hash(password,6)
        const newUser = await User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        if(!savedUser){
            throw new Error("Invalid User Data")
        }
        res.status(200).json({
            message: "User Has Been Created Successfully",
            user: savedUser
        })
    }
    catch(err){
        res.status(400).json({
            message: "Error creating user",
            error: err.message
        })
    }
})

const login = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message: "Please Fill In All Fields"})
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            throw new Error("Email Not Found")
        }
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            throw new Error("Invalid Password")
        }
        const token = jwt.sign({
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
                }
        },
        process.env.SECRET_TOKEN,
        { expiresIn:"1d"}
    )
        res.cookie("access_token",token, {
            httpOnly: true,

        }).status(200).json({
            messag:"User Can Log In",
            user: token    
        })   
    }
    catch(err){
        res.status(400).json({
            message: "Error logging in user", 
            error: err.message
        })
    }
})

module.exports = {register,login}