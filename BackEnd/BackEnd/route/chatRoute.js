
const express = require('express')

const authenticate = require('../middleware/Authentication')
const ChatModel = require('../model/chatModel')
const UserModel = require('../model/userModel')
const chatRouter= express.Router()

// accessing the chats or adding the chat
chatRouter.post('/',authenticate,async(req,res)=>{
        //partner user id
        const {userId}=req.body

        if(!userId){
            res.send('this user does not exist')
        }

        let isChat = await ChatModel.find({
            isGroupChat:false,
            $and:[
                {users:{$elemMatch:{$eq:req.user._id}}},
                {users:{$elemMatch:{$eq:userId}}}
            ]
        }) .populate("users", "-password").populate("latestMessage");
        
      isChat = await UserModel.populate(isChat,{
        path:"latestMeassage.sender",
        select:"name pic email"
      })

   if (isChat.length>0){
    res.send(isChat[0])
   }else{
    let chatData={
        chatName:'sender',
        isGroupChat:false,
        users:[req.user._id,userId]
    };
    try {
        const createChat = await ChatModel.create(chatData)

        const finalChat = await ChatModel.findOne({_id:createChat._id}).populate(
            'users',"-password")
            res.send(finalChat)
    } catch (error) {
      console.log('hiii')
        res.send(error.message)
    }
   }
})

// getting the chat 
chatRouter.get('/',authenticate,async(req,res)=>{
    try {
        ChatModel.find({users:{$elemMatch:{$eq:req.user._id}}}). populate('users','-password'). populate('groupAdmin','-password').populate('latestMessage').sort({updatedAt:-1}).then(async(result)=>{
     
        result = await UserModel.populate(result,
          {
            path:"latestMeassage.sender",
            select:"name pic email"
          })
          res.send(result)
      })
    } catch (error) {
       res.send({msg:'something went wrong',error:error.message})
    }
})

// create group chat 
chatRouter.post('/creategroup',authenticate,async(req,res)=>{
  if (!req.body.users || !req.body.name) {
    console.log(req.body.users, req.body.name)
    return res.send({ message: "all filleds are required" });
  }
  // 6475ac3dc54b1020f4652743
  // 6475ac20c54b1020f4652741
  var users =req.body.users

  if (users.length < 2) {
    return res.send({msg:"group must have more than two users"});
  }
// here i am including current user
console.log(users)
console.log(req.user)
  users.push(req.user);
  console.log(users)

  try {
    const groupChat = await ChatModel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    

    const groupChatData = await ChatModel.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.send({data:groupChatData})
  } catch (error) {
    res.send({msg:'something went wrong',error:error.message})
  }
})

// rename group 
chatRouter.put('/renamegroup',authenticate,async(req,res)=>{
  const { chatId, chatName } = req.body;

  const updatedChat = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.send({msg:'chat not found'})
  } else {
    res.send(updatedChat)
  }
})

// delete group 
chatRouter.put('/removefromgroup',authenticate,async(req,res)=>{
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removeMember = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if (!removeMember) {
      res.send({msg:'chat not found'})
    } else {
      res.send(removeMember)
    }
})

// add a person in the group 

chatRouter.put('/addmember',authenticate,async(req,res)=>{
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const addMember = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if (!addMember) {
      res.send({msg:'chat not found'})
    } else {
      res.send(addMember)
    }
})

module.exports=chatRouter