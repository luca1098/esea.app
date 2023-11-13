import { Stack, Box, Input, Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (res?.status === 200 && !res.error) router.push('/dashboard');
  };

  return (
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
  );
};

export default SignIn;
