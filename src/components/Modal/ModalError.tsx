import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FaExclamation, FaTimes } from 'react-icons/fa';
import { theme } from '../../styles/theme';

interface iModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
  secondaryText: string;
}

export const ModalError = ({
  isOpen,
  onClose,
  error,
  secondaryText,
}: iModalErrorProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent color='gray.600'>
      <ModalHeader display='flex'>
        <Center bgColor='red.600' w='30px' h='30px' borderRadius='5px'>
          <FaExclamation color={theme.colors.white} />
        </Center>
        <Text fontWeight='bold' ml='2'>
          Oops!
        </Text>
        <Center
          as='button'
          ml='auto'
          w='32px'
          h='32px'
          bg='red.600'
          fontSize='lg'
          borderRadius='md'
          onClick={onClose}
          _hover={{ bg: 'red.700' }}
        >
          <FaTimes color={theme.colors.white} />
        </Center>
      </ModalHeader>

      <ModalBody textAlign='center' color='gray.400'>
        <Text>
          Ocorreu algum erro! <b>{error}</b>
        </Text>
      </ModalBody>

      <ModalFooter display='column'>
        <Button
          bg='red.600'
          color='white'
          w='100%'
          h='60px'
          _hover={{ bg: 'red.700' }}
          mr={3}
          onClick={onClose}
        >
          Tentar Novamente
        </Button>
        <Text mt='4' textAlign='center'>
          <Box
            dangerouslySetInnerHTML={{
              __html: secondaryText,
            }}
          />
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
