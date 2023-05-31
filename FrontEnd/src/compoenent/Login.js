import { Button, Flex, FormControl, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    const navigate=useNavigate()

    const submitForm = async () => {
        if(!email || !password ){
         toast({
             title: 'failed',
             description: "invailid credentials",
             status: "error",
             duration: 3000,
             isClosable: true,
             position:'top'
           })
           return ;
        }

        try {
         fetch('http://localhost:8080/user/login',{
             method:'POST',
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({email,password})
         }).then(res=>res.json())
         .then(res=>{
            if(res.token){
                toast({
                    title: 'success',
                    description: "you are successfully logged in",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position:'top'
                  })                 
                  localStorage.setItem('chatToken',res.token)
                  navigate('/chat')
            }else{
                toast({
                    title: 'failed',
                    description: "invailid credentials",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position:'top'
                  })
            }
             
               return ;
         }).catch(res=>{
             toast({
                 title: 'something went wrong',
                 description: "please check your credential",
                 status: 'error',
                 duration: 5000,
                 isClosable: true,
                 position:'top'
               })
               console.log(res)
               return ;
         })
        } catch (error) {
         console.log('something went wrong ',error)
        }
 }
    return (
        <Flex w='100%' direction={'column'} gap='10px'>
            <FormControl>
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='email' />
            </FormControl>


            <FormControl>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(prev => !prev)}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme='blue'
                p="8px"
                onClick={() => submitForm()}
                w='100%'>
                Login
            </Button>

            
            {/* <Button
                colorScheme='blue'
                p="8px"
                onClick={() => submitForm}
                w='100%'>
                Login
            </Button> */}
        </Flex>
    )
}

export default Login