import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
} from '@chakra-ui/react';
import {
  FaCheck,
  FaCube,
  FaExclamation,
  FaTimes,
  FaTrash,
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContexts';
import { useTasks } from '../../contexts/TasksContexts';
import { theme } from '../../styles/theme';

interface iTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface iModalTaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: iTask;
}

export const ModalTaskDetail = ({
  task,
  isOpen,
  onClose,
}: iModalTaskDetailProps) => {
  const { accessToken, user } = useAuth();
  const { deleteTask, updateTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task.id, accessToken);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding='2' bg='white' color='gray.800'>
        <ModalHeader display='flex' justifyContent='space-between'>
          <Flex>
            <Center bgColor='purple.500' w='30px' h='30px' borderRadius='5px'>
              <FaCube color={theme.colors.white} />
            </Center>
            <Text fontWeight='bold' ml='2'>
              Visualizar
            </Text>
          </Flex>

          <HStack spacing='2'>
            <Center
              as='button'
              w='30px'
              h='30px'
              borderWidth='1px'
              borderRadius='5px'
              borderColor='gray.200'
              bgColor='white'
              onClick={handleDelete}
            >
              <FaTrash color={theme.colors.gray[300]} />
            </Center>
            <Center
              as='button'
              w='30px'
              h='30px'
              borderWidth='1px'
              borderRadius='5px'
              borderColor='gray.200'
              bgColor='white'
              onClick={() => updateTask(task.id, user.id, accessToken)}
            >
              <FaCheck color={theme.colors.gray[300]} />
            </Center>
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
          </HStack>
        </ModalHeader>

        <ModalBody>
          <Heading as='h1' fontSize='2xl'>
            {task.title}
          </Heading>
          <Text color='gray.400'>{task.description}</Text>
        </ModalBody>

        <Box padding='6'>
          <Progress colorScheme='purple' value={task.completed ? 100 : 10} />
          <Text color='gray.300' mt='3'>
            07 March 2022
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  );
};
