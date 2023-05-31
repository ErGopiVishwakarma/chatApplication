
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Image, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal'
import { ChatProvider } from './ContextProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadiingComponent from './LoadiingComponent'
import SearchListItem from './SearchListItem'

const Navbar = () => {
    const {user,setUser,selectChat,setSelectChat,chats,setChats} = useContext(ChatProvider)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const navigate = useNavigate()
    const [searchData, setSearch] = useState('')
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [chatLoading, setChatLoading] = useState(false)
    let token = localStorage.getItem('chatToken')

    const logOutHandler = () => {
        localStorage.removeItem('chatToken')
        navigate('/')
    }

    const handleSearch = async () => {

        if (!searchData) {
            toast({
                title: 'please write something for search..',
                description: "",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: 'top-left'
            })
            return;
        }

        try {
            setLoading(true)
            const data = await fetch(`http://localhost:8080/user/allusers?search=${searchData}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => res.json())
            setSearchResult(data)
            setLoading(false)


        } catch (error) {
            toast({
                title: 'ohh no...',
                description: "something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top-left'
            })
            return;
        }
    }

    const createChat = async(userId)=>{
         try {
            setChatLoading(true)
            let userObj={
                userId
            }
            const data = await fetch(`http://localhost:8080/chat`, {
                method: 'POST',
                headers: {
                    "Content-Type":'application/json',
                    authorization: `Bearer ${token}`
                },
                body:JSON.stringify(userObj)
            }).then(res => res.json())

            if(!chats?.find(element=>element._id === data._id)) setChats([data,...chats])
            setChatLoading(false)
            setSelectChat(data)
            onClose()            
            
         } catch (error) {
            toast({
                title: 'something went wrong',
                description: "fetching error",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top-left'
            })
            return;
         }
    }
    

    return (
        <Flex h='60px' justifyContent={'space-between'} px="30px" py="10px" bg="blackAlpha.700" alignItems={'center'} position='fixed' w='100%' zIndex='99'>
            <Tooltip hasArrow label='Search User' bg='blackAlpha.800' color='white' w="120px" textAlign={'center'}>
                <Button ref={btnRef} onClick={onOpen}>
                    <Flex gap="10px" alignItems={'center'}>
                        <SearchIcon />
                        <Text>search user</Text>
                    </Flex>
                </Button>
            </Tooltip>
       
            <Drawer
                bg="blackAlpha.700"
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                           {/* <LoadiingComponent /> */}
                    <DrawerBody>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                placeholder='search...'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleSearch}>
                                    search
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {
                            loading ? <LoadiingComponent /> : 
                            <Flex gap="10px" direction={'column'}>
                           { searchResult?.map(el=>(
                               <SearchListItem key={el._id} user={el} userFun={createChat} />
                        ))  
                           }
                            </Flex>                      
                        }                   

                        
                    </DrawerBody>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>


            <Text fontSize={'20px'} color={'white'} fontWeight={'bolder'}> Tech World</Text>


            {/* profile part  */}
            <Flex gap="40px" alignItems={'center'}>
                <Box>
                    <BellIcon fontSize="20px" color={'white'} />
                </Box>
                <Menu>
                    <MenuButton as={Button} variant={'unstyled'} >
                        <Flex alignItems={'center'} gap='10px' cursor={'pointer'}>
                            <Image h="40px" w="40px" src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" borderRadius={'50%'} />
                            <ChevronDownIcon color='white' fontSize={'25px'} />
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <ProfileModal>Profile</ProfileModal>
                        </MenuItem>
                        <MenuItem onClick={logOutHandler}>LogOut</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>


        </Flex>
    )
}

export default Navbar