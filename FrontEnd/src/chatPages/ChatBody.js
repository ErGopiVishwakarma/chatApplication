
import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { ChatProvider } from './ContextProvider'

const ChatBody = () => {
  const {user,setUser,selectChat,setSelectChat,chats,setChats} = useContext(ChatProvider)
  return (
   <Box h="100vh" w='100%' boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} bg='blackAlpha.500' borderRadius={'10px'} >
       
   </Box>
  )
}

export default ChatBody