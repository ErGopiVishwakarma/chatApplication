import React, { useContext } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    Button,
    IconButton,
    Avatar,
    Text,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'


const ProfileModal = ({user,children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box>
        {
            children?<span style={{width:"100%"}} onClick={onOpen}>{children}</span>:<IconButton icon={<ViewIcon />} onClick={onOpen} display='flex' />
        }

            <Modal isOpen={isOpen} onClose={onClose} m="auto">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDirection="column" justifyContent={'center'} alignItems={'center'}>
                    <Text>{user?.name}</Text>
                      <Avatar src={user?.pic}  h="120px" w='120px' m="auto" />
                      <Text>{user?.email}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                     
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProfileModal