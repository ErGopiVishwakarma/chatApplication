import { Box, Container, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'

import ContextProvider from '../chatPages/ContextProvider'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
//   const {user, setUser} = useContext(ContextProvider)
//   const navigate = useNavigate()
//   useEffect(()=>{
//     if(user){
//        navigate('/chat')
//     }
//   },[])

    return (

       
       <Container maxW={'md'} centerContent pos="relative" zIndex={999} pt="20px">
            <Box borderRadius={'15px'} display='flex' justifyContent={'center'} alignItems={'center'} p='10px' bg='white' w='100%'>
                <Text fontSize={'20px'}>Chat Application</Text>
            </Box>
            <Box bg='white' mt='10px' p='5px' w='100%'  borderRadius={'15px'}>
                <Tabs variant='soft-rounded'>
                    <TabList display={'flex'} justifyContent={'space-around'}>
                        <Tab>Sign up</Tab>
                        <Tab>Login</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                        <Signup />
                         
                        </TabPanel>
                        <TabPanel>
                        <Login />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
       

    )
}

export default HomePage