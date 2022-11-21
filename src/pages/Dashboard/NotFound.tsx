import { Box, Center, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { SearchBox } from '../../components/Form/SearchBox';
import { Header } from '../../components/Header';
import { ModalTaskDetail } from '../../components/Modal/ModalTaskDetail';

interface iTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface iNotFoundProps {
  isTaskDetailOpen: boolean;
  onTaskDetailClose: () => void;
  selectedTask: iTask;
  taskNotFound: string;
}

export const NotFound = ({
  isTaskDetailOpen,
  onTaskDetailClose,
  selectedTask,
  taskNotFound,
}: // eslint-disable-next-line arrow-body-style
iNotFoundProps) => {
  return (
    <>
      <ModalTaskDetail
        isOpen={isTaskDetailOpen}
        onClose={onTaskDetailClose}
        task={selectedTask}
      />
      <Box>
        <Header />
        <SearchBox />
        <Center mt='4' textAlign='center' display='flex' flexDir='column'>
          <Heading size='lg'>Não encontramos resultado para: </Heading>
          <Text fontSize='xl' color='gray.300' fontWeight='bold'>
            {taskNotFound}
          </Text>
          <Box
            mt='6'
            w={['80%', '40%']}
            padding='6'
            boxShadow='base'
            bg='white'
          >
            <Stack>
              <Skeleton
                h='20px'
                borderRadius='20px'
                startColor='gray.100'
                endColor='gray.200'
                w='80%'
              />
              <Skeleton
                h='20px'
                borderRadius='20px'
                startColor='gray.100'
                endColor='gray.200'
                w='60%'
              />
            </Stack>
            <Stack mt='8'>
              <Skeleton
                h='15px'
                borderRadius='20px'
                startColor='gray.100'
                endColor='gray.200'
              />
              <Skeleton
                h='15px'
                borderRadius='20px'
                startColor='gray.100'
                endColor='gray.200'
              />
            </Stack>
          </Box>
        </Center>
      </Box>
    </>
  );
};
