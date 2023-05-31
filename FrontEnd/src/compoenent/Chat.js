import React, { useEffect } from 'react'
import axios from 'axios'
import {Box, Flex} from '@chakra-ui/react'
import Navbar from '../chatPages/Navbar'
import Sidebar from '../chatPages/Sidebar'
import ChatBody from '../chatPages/ChatBody'

const Chat = () => {

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
      <Flex gap="11px" px="11px" py='12px' pt="80px">
        <Box w='25%'>
          <Sidebar />
        </Box>
        <Box w='75%'>
          <ChatBody />
        </Box>
      </Flex>
    </Box>
  )
}

export default Chat