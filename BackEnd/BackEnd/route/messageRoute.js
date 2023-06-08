const express = require('express')
const authenticate = require('../middleware/Authentication');
const messageModel = require('../model/messageModle');
const UserModel = require('../model/userModel');
const ChatModel = require('../model/chatModel');
const messageRouter = express.Router()

messageRouter.post('/',authenticate,async(req,res)=>{
          const {content , chatId} = req.body;
          if(!content || !chatId) {
            console.log('Invalid data')
            return res.sendStatus(400).send('Invalid data')
          }

          var messageObject = {
            sender : req.user._id,
            content : content,
            chat : chatId
          }

          try {
            
            var message = await messageModel.create(messageObject)
            message = await message.populate('sender', 'name pic')
            message = await message.populate('chat')
            message = await UserModel.populate(message, {
                path:'chat.users',
                select:'name pic email'
            })

            await ChatModel.findByIdAndUpdate(req.body.chatId,{
                latestMessage : message,
            })

            res.json(message)
          } catch (error) {
             res.send({msg:'something wrong', err:error.message})
          }
})

messageRouter.get('/:chatId',authenticate,async(req,res)=>{


    try {
        const allMessages = await messageModel.find({chat:req.params.chatId}).populate('sender','name pic email').populate('chat')

        res.json(allMessages)
    } catch (error) {
        res.send({msg:'somthing wrong ', err:error.message})
    }
})

module.exports = messageRouter