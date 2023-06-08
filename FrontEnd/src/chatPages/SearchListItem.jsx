import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const SearchListItem = ({user,userFun}) => {
  return (
     <Flex gap='10px' p="6px" bg='blackAlpha.600' _hover={{backgroundColor:'#90EE90'}} borderRadius={'8px'} cursor='pointer' onClick={()=>userFun(user._id)} >
           <Flex gap="15px" alignItems={'center'}>
            <Avatar src={user.pic} name={`${user.name} ${user.email}`} />           
            <Text fontWeight={'bold'} color="white">{user.name}</Text>
           </Flex>
     </Flex>
  )
}

export default SearchListItem