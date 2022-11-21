import { Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContexts';
import { LoginInfo } from './LoginInfo';
import { LoginForm } from './LoginForm';

const signInSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
});

interface iSignInData {
  email: string;
  password: string;
}

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { signIn } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<iSignInData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = (data: iSignInData) => {
    setLoading(true);
    signIn(data)
      .then((_) => {
        setLoading(false);
        history.push('/dashboard');
        console.log('okkkkk');
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <Flex
      padding={['10px 15px', '10px 15px', '0px 0px', '0px 0px']}
      alignItems='center'
      justifyContent='center'
      height={['auto', 'auto', '100vh', '100vh']}
      bgGradient={[
        'linear(to-b, purple.800 65%, white 35%)',
        'linear(to-b, purple.800 65%, white 35%)',
        'linear(to-r, purple.800 65%, white 35%)',
        'linear(to-r, purple.800 65%, white 35%)',
      ]}
      color='white'
    >
      <Flex
        w={['100%', '100%', '90%', '65%']}
        justifyContent='center'
        flexDirection={['column', 'column', 'row', 'row']}
        alignItems='center'
      >
        <LoginInfo />
        <LoginForm
          errors={errors}
          handleSignIn={handleSubmit(handleSignIn)}
          loading={loading}
          register={register}
        />
      </Flex>
    </Flex>
  );
};
