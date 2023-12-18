import React from 'react';
import LoginBox from './LoginBox';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Stack, Text } from '@chakra-ui/react';
import InputField from '@/kit/Input/InputField';
import Link from 'next/link';
import { SignUpFormProps, SignUpFormSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { createUserMutation } from '@/graphql/queries/user';
import { useRouter } from 'next/router';
import bcryptjs from 'bcryptjs';
import { SALT } from '@/lib/utils';
import useResponseToast from '@/core/hooks/useResponseToast';

const SignUpForm = () => {
  const router = useRouter();
  const methods = useForm<SignUpFormProps>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const { errorToast, successToast } = useResponseToast();
  const [createUser, { loading }] = useMutation(createUserMutation);

  const onSubmit = async (val: SignUpFormProps) => {
    //AGGIUNGERE CRIPTOGRAFIA
    const { name, email, password, confirmPassword } = val;

    if (password === confirmPassword) {
      const cryptedPw = await bcryptjs.hash(password, SALT);
      const { data, errors } = await createUser({
        variables: { credentials: { name, email, password: cryptedPw } },
      });
      if (errors || !data?.user?.valido) {
        errorToast(errors, data?.user);
      } else {
        successToast(data?.user);
        methods.reset({});
        router.push('/sign-in/');
      }
    }
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
            placeholder='Nome e cognome'
            name='name'
            label='Nome e cognome'
          />
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
          <InputField
            type='password'
            placeholder='Conferma password'
            name='confirmPassword'
            label='Conferma password'
          />
          <Button type='submit' isLoading={loading}>
            Registrati
          </Button>
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
