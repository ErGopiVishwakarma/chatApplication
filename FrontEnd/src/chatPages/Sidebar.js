
import { Avatar, Box, Button, Flex, Heading, Spinner, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { ChatProvider } from './ContextProvider'
import GroupChatModal from './GroupChatModal'

const Sidebar = () => {
  const [loggedUser, setLoggedUser] = useState()
  const { user, setUser, selectChat, setSelectChat, chats, setChats } = useContext(ChatProvider)
  const toast = useToast()
  const token = localStorage.getItem('chatToken')

  const getChats = async () => {
    try {
      const data = await fetch(`http://localhost:8080/chat`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(res => res.json())

      setChats(data)
    }
    catch (error) {
      toast({
        title: 'something went wrong',
        description: "failed to load chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: 'top-left'
      })
      return;
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
    getChats()
  }, [])
  console.log(chats)
  return (
    <Box h="540px" w='100%' boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} bg='blackAlpha.500' borderRadius={'10px'} >
      <Flex direction={'column'}>
        <Flex justifyContent={'space-between'} alignItems={'center'} pb='10px'>
          <Text fontSize={'20px'} fontWeight={'bolder'} >
            chats
          </Text>
          <GroupChatModal>
            <Button>Group Chat +</Button>
          </GroupChatModal>
        </Flex>
        <VStack spacing={'2px'}>
          {
            chats ? (
              chats?.map(el => (
                <Flex
                  w="100%"
                  gap="15px"
                  p="10px"
                  borderRadius={'8px'} cursor='pointer'

                  onClick={() => setSelectChat(el)}
                  bg={selectChat === el ? "#90EE90" : '#FFEFD5'}
                  color={selectChat === el ? 'black' : 'black'}
                >

                  <Text fontWeight={'bold'}>

                    {el.isGroupChat ? el.chatName : loggedUser._id === el.users[0]._id ? el.users[0].name : el.users[1].name}


                  </Text>

                </Flex>
              ))
            ) : (
              <Spinner color='red.500' />
            )
          }
        </VStack>
      </Flex>
    </Box>
  )
}

export default Sidebar