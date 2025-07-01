const express = require('express')
const app = express()
const connectDB = require('./config/dbConn')

const port = process.env.PORT || 4000;

//middle wares 
app.use(express.json())
const cors = require('cors')
app.use(cors())
require('dotenv').config()
app.use("/images",express.static('uploads'))

connectDB() 

//ROUTES 
// api endpoints
app.use('/api/food',require('./routes/foodRouter'))
app.use('/api/user',require('./routes/userRouter'))
app.use('/api/cart',require('./routes/cartRouter'))
app.use('/api/order',require('./routes/orderRouter'))


app.get("/",(req,res)=>{
    res.send("API WORKING")
})


app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})
