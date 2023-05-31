
const express = require('express')
const UserModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const authenticate = require('../middleware/Authentication')

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    res.send('hii this is user page')
})
userRouter.post('/signup', (req, res) => {
    const { name, email, password, pic } = req.body
    try {
        bcryptjs.hash(password, 5, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash, pic })
            await user.save() 
            res.send({ msg: 'user has been successfully signup....' ,user})
        })
    } catch (error) {
        console.log('something went wrong....')
        res.send({ msg: 'something went wrong...', error: error.message })
    }

})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcryptjs.compare(password, user[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user[0]._id }, 'chat')
                    res.send({ msg: 'user has been successfully login...', token })
                } else {
                    res.send({ msg: 'something went wrong...'})
                }
            })
        } else {
            res.send({ msg: 'login failed...' })
        }
    } catch (error) {
        res.send({ msg: 'somthing went wrong...', error: error.message })
    }
})



userRouter.get('/allusers',authenticate, async (req, res) => {
    const searchData = req.query.search ? {
        $or: [
            { "name": { $regex: req.query.search, $options: 'i' } },
            { "email": { $regex: req.query.search, $options: 'i' } },
        ]
    } : {};

    const user = await UserModel.find(searchData).find({ _id: { $ne: req.user.id }})
    res.send(user)
})



module.exports = {
    userRouter
}