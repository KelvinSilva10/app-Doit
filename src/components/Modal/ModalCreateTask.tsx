import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaClipboard, FaTimes } from 'react-icons/fa';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContexts';
import { useTasks } from '../../contexts/TasksContexts';
import { theme } from '../../styles/theme';
import { Input } from '../Form/Input';
import { TextArea } from '../Form/TextArea';

interface iModalCreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

interface iTaskData {
  title: string;
  description: string;
}

const createTaskSchema = yup.object().shape({
  title: yup.string().required('Campo obrigatório'),
  description: yup
    .string()
    .required('Campo obrigatório')
    .max(100, 'Máximo de 100 caracteres'),
});

export const ModalCreateTask = ({ isOpen, onClose }: iModalCreateTaskProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<iTaskData>({
    resolver: yupResolver(createTaskSchema),
  });

  const { user, accessToken } = useAuth();
  const { createTask } = useTasks();

  const handleCreateTask = (data: iTaskData) => {
    const newData = { ...data, userId: user.id, completed: false };
    createTask(newData, accessToken).then((res) => onClose());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as='form'
        onSubmit={handleSubmit(handleCreateTask)}
        padding='2'
        bg='white'
        color='gray.800'
      >
        <ModalHeader display='flex'>
          <Center bgColor='purple.500' w='30px' h='30px' borderRadius='5px'>
            <FaClipboard color={theme.colors.white} />
          </Center>
          <Text fontWeight='bold' ml='2'>
            Adicionar
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

        <ModalBody textAlign='center'>
          <VStack spacing='5'>
            <Input
              label='Título'
              error={errors.title}
              {...register('title')}
              placeholder='Digite o titulo'
            />
            <TextArea
              label='Descrição'
              error={errors.description}
              {...register('description')}
              placeholder='Digite o descrição'
            />
          </VStack>
        </ModalBody>

        <ModalFooter flexDirection='column'>
          <Button
            type='submit'
            bg='purple.500'
            color='white'
            w='100%'
            h='60px'
            _hover={{ bg: 'purple.600' }}
          >
            Adicionar Tarefa
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
