const mongoose = require("mongoose")
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB is connected on ${conn.connection.host}`)
    }
    catch (err) {
        console.error(`Error : ${err.message}`)
        process.exit(1)
    }

}

module.exports = connectDB