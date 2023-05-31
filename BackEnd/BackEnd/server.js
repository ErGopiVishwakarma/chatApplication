const express = require('express')
const { connection } = require('./config/db')
const {userRouter} = require('./route/userRoute')
const chatRouter = require('./route/chatRoute')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('this is the home page')
})

app.use('/user',userRouter)
app.use('/chat',chatRouter)











app.listen(8080,async()=>{
    try {
        await connection
        console.log('connected to db..')
    } catch (error) {
        console.log('can not connect to mongodb' , error)
    }
    console.log('server is running....8080')
})