import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react';

import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Input } from '../../components/Form/Input';

interface iSignUpData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface iSignUpFormProps {
  handleSignUp: () => void;
  errors: Partial<
    FieldErrorsImpl<{
      name: string;
      email: string;
      password: string;
      confirm_password: string;
    }>
  >;
  register: UseFormRegister<iSignUpData>;
  loading: boolean;
}

export const SignupForm = ({
  handleSignUp,
  errors,
  register,
  loading,
}: iSignUpFormProps) => (
  <Grid
    onSubmit={handleSignUp}
    as='form'
    padding='40px 25px'
    border='3px solid'
    borderColor='gray.100'
    bg='white'
    color='gray.900'
    mt={['4', '4', '0']}
    w={['100%', '100%', '40%', '40%']}
  >
    <Heading size='lg'>Crie sua conta</Heading>
    <VStack mt='6' spacing='5'>
      <Input
        placeholder='Digite seu nome'
        icon={FaUser}
        label='Nome'
        error={errors.name}
        {...register('name')}
      />
      <Box w='100%'>
        <Input
          placeholder='Digite seu login'
          icon={FaEnvelope}
          label='Email'
          type='email'
          error={errors.email}
          {...register('email')}
        />
        {!errors.email && (
          <Text ml='1' mt='1' color='gray.300'>
            Exemplo: nome@email.com
          </Text>
        )}
      </Box>
      <Input
        placeholder='Digite sua senha'
        icon={FaLock}
        label='Senha'
        type='password'
        error={errors.password}
        {...register('password')}
      />
      <Input
        placeholder='Confirme sua senha'
        icon={FaLock}
        label='Confirmação de Senha'
        type='password'
        error={errors.confirm_password}
        {...register('confirm_password')}
      />
    </VStack>

    <Button
      mt='8'
      isLoading={loading}
      bg='purple.800'
      color='white'
      w='100%'
      h='60px'
      borderRadius='8px'
      _hover={{ bg: 'purple.900' }}
      type='submit'
    >
      Finalizar Cadastro
    </Button>
  </Grid>
);
