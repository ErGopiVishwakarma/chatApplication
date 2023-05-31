import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const SearchListItem = ({user,userFun}) => {
  return (
     <Flex gap='10px' p="6px" bg='#FFEFD5' _hover={{backgroundColor:'#90EE90'}} borderRadius={'8px'} cursor='pointer' onClick={()=>userFun(user._id)} >
           <Box>
            <Avatar src={user.pic} name={`${user.name} ${user.email}`} />
           </Box>
           <Flex direction={'column'}>
            <Text fontWeight={'bold'}>{user.name}</Text>
            <Text fontSize={'14px'}><b>Email</b>: {user.email}</Text>
           </Flex>
     </Flex>
  )
}

export default SearchListItem