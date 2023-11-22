import React, { useState } from 'react';
import LoginBox from './LoginBox';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Stack, Text, useToast } from '@chakra-ui/react';
import InputField from '@/kit/Input/InputField';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { SignInFormProps, SignInFormSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<SignInFormProps>({
    resolver: zodResolver(SignInFormSchema),
  });
  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    setIsLoading(false);
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
    <LoginBox title='Login'>
      <FormProvider {...methods}>
        <Stack
          as={'form'}
          spacing={3}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <InputField
            type='email'
            placeholder='Email'
            name='email'
            label='Email'
          />
          <InputField
            type='password'
            placeholder='Password'
            name='password'
            label='Password'
          />
          <Button type='submit' isLoading={isLoading}>
            Accedi
          </Button>
          <Text textAlign={'center'} fontSize={'sm'}>
            Non hai un account? <Link href={'/sign-up'}>Registrati qui</Link>
          </Text>
        </Stack>
      </FormProvider>
    </LoginBox>
  );
};

export default SignInForm;
