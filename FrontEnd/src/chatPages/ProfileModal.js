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


const ProfileModal = ({children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box>
        {
            children?<span style={{width:"100%"}} onClick={onOpen}>{children}</span>:<IconButton icon={<ViewIcon />} onClick={{onOpen}} display='flex' />
        }

            <Modal isOpen={isOpen} onClose={onClose} m="auto">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDirection="column" justifyContent={'center'} alignItems={'center'}>
                    <Text>gopi vishwakarma</Text>
                      <Avatar src="" name="gopi pagal" h="120px" w='120px' m="auto" />
                      <Text>gopi@gmail.com</Text>
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