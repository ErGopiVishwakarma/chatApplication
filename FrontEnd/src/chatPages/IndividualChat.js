import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { ChatProvider } from './ContextProvider'
import { ArrowBackIcon, Search2Icon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal'
import UpdateGroupChatModal from './UpadateGroupChatModal'

const IndividualChat = ({ fetchAgain, setFetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState()
    const { user, setUser, selectChat, setSelectChat, chats, setChats } = useContext(ChatProvider)
    // console.log(selectChat)

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
      }, [])
    //   console.log(loggedUser)
    return (
        <Box>
            {
                selectChat ? <>
                    <Flex direction={'column'}>
                        <Flex justifyContent={'space-between'}>
                            <IconButton
                                variant={'unstyled'}
                                fontSize="20px"
                                fontWeight={'bolder'}
                                display={{ base: 'block', md: 'none' }}
                                icon={<ArrowBackIcon />}
                                onClick={() => setSelectChat('')}
                            />
                            <Box>
                                {
                                    selectChat.isGroupChat ? <>
                                        <Text>
                                           
                                            {selectChat.chatName}
                                        </Text>
                                    </> :
                                        <>
                                            <Text>
                                                {selectChat.users[1].name}
                                            </Text>
                                        </>
                                }
                            </Box>
                            {
                                selectChat.isGroupChat?
                                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />:<ProfileModal user={selectChat.users[0]._id === loggedUser._id ? selectChat.users[1] : selectChat.users[0]}></ProfileModal>
                            }
                          
                           
                        </Flex>
                        <Flex>

                        </Flex>
                    </Flex>
                </> :
                    <Flex alignItems={'center'} justifyContent={'center'}>
                        <Heading color={'white'}>
                            Click the user to start chat
                        </Heading>
                    </Flex>
            }
        </Box>
    )
}

export default IndividualChat