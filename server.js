const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const connectDB = require("./config/db")
const errorHandler = require("./middlewares/errorHandler")
const cookieParser = require("cookie-parser")
const port = process.env.Port || 5000

app.use(errorHandler)
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/users", require("./routes/usersRoute"))
app.use("/api/hotels", require("./routes/hotelsRoute"))
app.use("/api/rooms", require("./routes/roomsRoute"))
console.log(`Mongo URL: ${process.env.MONGO_URL}`);

app.listen(port, (req,res)=>{
    connectDB()
    console.log(`Server is running on port ${port}`)
})