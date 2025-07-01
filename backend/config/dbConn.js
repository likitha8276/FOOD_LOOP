const mongoose = require('mongoose')
const connectDB=async()=>{
    await mongoose.connect(process.env.DB_URI).then(()=>{
        console.log("DB CONNECTED")
    })
}
module.exports= connectDB