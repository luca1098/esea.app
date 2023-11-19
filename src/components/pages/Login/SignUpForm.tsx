import React from 'react';
import LoginBox from './LoginBox';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Stack, Text } from '@chakra-ui/react';
import InputField from '@/kit/Input/InputField';
import Link from 'next/link';
import { SignInFormSchema, SignUpFormProps } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUpForm = () => {
  const methods = useForm<SignUpFormProps>({
    resolver: zodResolver(SignInFormSchema),
  });
  const onSubmit = (val: any) => {
    console.log(val);
  };
  return (
    <LoginBox title='Registrati'>
      <FormProvider {...methods}>
        <Stack
          as={'form'}
          spacing={3}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <InputField
            type='text'
            placeholder='Nome e cognome'
            name='name'
            label='Nome e cognome'
          />
          <InputField
            type='email'
            placeholder='Email'
            name='Email'
            label='Email'
          />
          <InputField
            type='password'
            placeholder='Password'
            name='password'
            label='Password'
          />
          <InputField
            type='password'
            placeholder='Conferma password'
            name='confirmPassword'
            label='Conferma password'
          />
          <Button type='submit'>Registrati</Button>
          <Text textAlign={'center'} fontSize={'sm'}>
            Hai già un account?{' '}
            <Link href={'/sign-in'}>Effettua il login.</Link>
          </Text>
        </Stack>
      </FormProvider>
    </LoginBox>
  );
};

export default SignUpForm;
