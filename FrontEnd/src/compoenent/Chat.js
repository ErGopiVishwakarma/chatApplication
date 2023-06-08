import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {Box, Flex} from '@chakra-ui/react'
import Navbar from '../chatPages/Navbar'
import Sidebar from '../chatPages/Sidebar'
import ChatBody from '../chatPages/ChatBody'
import { ChatProvider } from '../chatPages/ContextProvider'

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false)
  const { user, setUser, selectChat, setSelectChat, chats, setChats } = useContext(ChatProvider)

    const fetchData =async()=>{
        const data = await axios('http://localhost:8080/chat')
        
    }

    useEffect(()=>{
        fetchData()
    },[])
  return (
    <Box position={'relative'}>
      <Box>
        <Navbar />
      </Box>
      <Flex >
        <Box w={{base:'100%',md:'30%'}} display={{base: !selectChat? 'block':' none' , md:'block'}}>
          <Sidebar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
        <Box w={{base:'100%',md:'70%'}}  display={{base: selectChat? 'block':' none' , md:'block'}}>
          <ChatBody fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
      </Flex>
    </Box>
  )
}

export default Chat