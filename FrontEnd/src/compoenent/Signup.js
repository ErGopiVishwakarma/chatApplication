import { Button, VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
    const [show, setShow] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const toast = useToast()
    const [pic,setPic] = useState('')

    const setProfile=async(pics)=>{

        if (pics === undefined) {
          toast({
            title: "Please Select an Image!",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/jpg" || pics.type === "image/png") {
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "chat-app");
          data.append("cloud_name", "dr2fwpzbx");
          const config={
            mode:'no-cors',
          }
          const value= await axios.post('https://api.cloudinary.com/v1_1/dr2fwpzbx/image/upload',data,config)
          setPic(value.data.url)
           
        } else {
          toast({
            title: "failed",
            description:'image should be jpeg/png formate',
            status: "warning",
            duration: 3000,
            isClosable: true,            
            position:'top'
          });
          return;
        }
    }

    const submitForm = async () => {
           if(!name || !email || !password || !confirmPassword){
            toast({
                title: 'failed',
                description: "all filled are required",
                status: "error",
                duration: 3000,
                isClosable: true,
                position:'top'
              })
              return ;
           }
           if(password !== confirmPassword){
            toast({
                title: 'password do not match',
                description: "please check your password",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
              return ;
           }
           console.log(pic)
           try {
            fetch('http://localhost:8080/user/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name,email,password,pic:pic})
            }).then(res=>res.json()).then(res=>{
                toast({
                    title: 'account created',
                    description: "you are successfully registered, please login",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position:'top'
                  })
                  localStorage.setItem('userInfo',JSON.stringify(res.user))
                  return ;
            }).catch(res=>{
                toast({
                    title: 'something went wrong',
                    description: "invailid credentials",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position:'top'
                  })
                  return ;
            })
           } catch (error) {
            console.log('something went wrong ',error)
           }
    }
    return (
        <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={()=>setShow(prev=>!prev)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={showPass ? "text" : "password"}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={()=>setShowPass(prev=>!prev)}>
                {showPass ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="pic">
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => setProfile(e.target.files[0])}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitForm}
        >
          Sign Up
        </Button>
      </VStack>
    )
}

export default Signup