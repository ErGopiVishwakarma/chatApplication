import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Flex,
    Text,
    Box,
  } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { ChatProvider } from './ContextProvider'
import SearchListItem from './SearchListItem'
import axios from 'axios'

  function GroupChatModal({children}) {
    const {user,setUser,selectChat,setSelectChat,chats,setChats} = useContext(ChatProvider)
    const [loading,setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [search,setSearch] = useState()
    const [selectUsers, setSelectUsers] = useState([])
    const [searchResult , setSearchResult] = useState()
    const toast = useToast()
    const token = localStorage.getItem('chatToken')

    const handleSearch =async(query)=>{
          if(!query){
          return;
          }
          try {
            setLoading(true)
            const data = await fetch(`http://localhost:8080/user/allusers?search=${query}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => res.json())
            console.log(data)
            setSearchResult(data)
            setLoading(false)


        } catch (error) {
            toast({
                title: 'ohh no...',
                description: "something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            return;
        }
    }
    const createChat = async() =>{
          if(!groupChatName || !selectUsers){
            toast({
              title: 'ohh no...',
              description: "please write chat name",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: 'top'
          })
          return;
          }
          
          try {
            const config = {
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
            const {data} = await axios.post(`http://localhost:8080/chat/creategroup`, {
                 name:groupChatName,
                 users:selectUsers.map(el=>el._id)
            },
              config
            )
           setChats([data.data,...chats])
 

        } catch (error) {
            toast({
                title: 'ohh no...',
                description: "something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            return;
        }
    }

    const closeFun = async() =>{
    
        try {
          setLoading(true)
          const data = await fetch(`http://localhost:8080/user/allusers?search=abcXyx123@@##$$%%%$#$%`, {
              method: 'GET',
              headers: {
                  authorization: `Bearer ${token}`
              }
          }).then(res => res.json())
          console.log(data)
          setSearchResult(data)
          setLoading(false)


      } catch (error) {
          toast({
              title: 'ohh no...',
              description: "something went wrong",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: 'top'
          })
          return;
      }
    }
    const handleDelete = (delUser) =>{
      setSelectUsers(selectUsers.filter(el=>el._id !== delUser._id))
    }

    
    const handleSelectedUsers = (selectedUserId) =>{
      if(selectUsers.includes(selectedUserId)){
        toast({
          title: 'sorry...',
          description: "this user has been already selected",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: 'top'
      })
      return;
      }
      setSelectUsers([...selectUsers,selectedUserId])
    }
    return (
      <>
        <span onClick={onOpen}>{children}</span>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Group Chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
       <FormControl>
        <Input
        placeholder='chat name'
        mb={'15px'}
        onChange={(e)=>setGroupChatName(e.target.value)}

        />
       </FormControl>
       <FormControl>
        <Input
        placeholder='search user'
        mb="5px"
        onChange={(e)=>handleSearch(e.target.value)}
         />
       </FormControl>
       <Flex gap="10px">
       {
       selectUsers?.map(el=>(
          <Flex  borderRadius={'5px'} alignItems={'center'} bg="pink" px="5px" gap="10px" >
          <Text key={el._id} >{el.name}</Text>
          <Text fontSize={'22px'} cursor={'pointer'} onClick={()=>handleDelete(el)}>×</Text>
          </Flex>
       ))
  
       }
       </Flex>
    
       {/* selected user  */}
       <Flex direction={'column'} >
        {
          loading ? <Text>loading...</Text>:
          searchResult?.map(el=>(
             <Box key={el._id} onClick={()=>{
              handleSelectedUsers(el)
              closeFun()
              }}>
             <SearchListItem user={el} key={el._id}   userFun={()=>""} />
             </Box>
          ))
        }
       </Flex>
       {/* render users  */}
            </ModalBody>
  
            <ModalFooter>
            
              <Button variant='ghost' onClick={createChat}>Create</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default GroupChatModal;