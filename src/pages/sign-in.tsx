import Layout from '@/kit/Layout/Layout';
import { Stack, Box, Input, Button, useToast } from '@chakra-ui/react';
import { GetSessionParams, getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (values: any) => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (res?.error) {
      toast({
        title: 'Errore',
        description: res?.error,
        status: 'error',
        isClosable: true,
      });
    }
    if (res?.status === 200 && !res.error) router.push('/private/dashboard');
  };

  return (
    <Layout>
      <Box maxW={500} mx={'auto'} mt={8}>
        <Stack as={'form'} spacing={3} onSubmit={handleSubmit(onSubmit)}>
          <Input type='email' placeholder='Email' {...register('email')} />
          <Input
            type='password'
            placeholder='Password'
            {...register('password')}
          />
          <Button type='submit'>Submit</Button>
        </Stack>
      </Box>
    </Layout>
  );
};

export default SignIn;

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/private/dashboard',
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
