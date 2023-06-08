import { ViewIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  useToast,
  Box,
  Flex,
  Text,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react'
import { useContext, useState } from 'react';
import { ChatProvider } from './ContextProvider';
import axios from 'axios';
import SearchListItem from './SearchListItem';

const UpdateGroupChatModal = ({ children, fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setUser, selectChat, setSelectChat, chats, setChats } = useContext(ChatProvider)
  const [groupChatName, setGroupChatName] = useState()
  const [search, setSearch] = useState()
  const [selectUsers, setSelectUsers] = useState([])
  const [searchResult, setSearchResult] = useState()
  const [loading, setLoading] = useState(false)
  const [groupNameLoading, setGroupNameLaoding] = useState(false)
  const toast = useToast()
  let token = localStorage.getItem('chatToken')
  const userData = JSON.parse(localStorage.getItem('userInfo'))

  const leaveGroup = () => {

  }

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setGroupNameLaoding(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8080/chat/renamegroup`,
        {
          chatId: selectChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectChat(data);
      setFetchAgain(!fetchAgain);
      setGroupNameLaoding(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: 'something went wrong',
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setGroupNameLaoding(false);
    }
    setGroupChatName("");
  }

  const handleSearch = async (query) => {
    if (!query) {
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

  const handleAddUsers = async (user1) => {
    if (selectChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8080/chat/addmember`,
        {
          chatId: selectChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleDelete = async (user1) => {
    if (selectChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8080/chat/removefromgroup`,
        {
          chatId: selectChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectChat() : setSelectChat(data);
      setFetchAgain(!fetchAgain);
      //   fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: 'ohh something went wrong',
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };
  const closeFun = async () => {

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
  return (
    <>
      {
        children ? <span style={{ width: "100%" }} onClick={onOpen}>{children}</span> : <IconButton icon={<ViewIcon />} onClick={onOpen} display='flex' />
      }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexWrap={'wrap'} gap="10px">
              {
                selectChat.users?.map(el => (

                  <Flex borderRadius={'5px'} alignItems={'center'} bg="pink" px="5px" gap="10px" key={el._id} >
                    <Text key={el._id} >{el.name}</Text>
                    <Text fontSize={'22px'} cursor={'pointer'} onClick={() => handleDelete(el)}>×</Text>
                  </Flex>

                ))
              }
            </Flex>
            <FormControl pt='20px'>
              <InputGroup size='md'>
                <Input
                  pr='6.5rem'
                  placeholder='Enter Name'
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <InputRightElement width='5.5rem'>
                  <Button h='100%' size='md' bg="blackAlpha.900" colorScheme='white' onClick={() => handleRename()}>
                    update
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl pt='20px'>
              <InputGroup size='md'>
                <Input
                  pr='6.5rem'
                  placeholder='search'
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            {/* serch result  */}
            <Flex direction={'column'} >
              {
                loading ? <Text>loading...</Text> :
                  searchResult?.map(el => (
                    <Box key={el._id} onClick={() => {
                      handleAddUsers(el)
                      closeFun()
                    }}>
                      <SearchListItem user={el} key={el._id} userFun={() => ""} />
                    </Box>
                  ))
              }
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => handleDelete(userData)}>
              leave group
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal;