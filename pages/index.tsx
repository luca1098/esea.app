import { allUsersQuery } from '@/lib/graphql/queries/user';
import apolloClient from '@/lib/apollo';
import { Box, Button, Stack, Heading, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type HomeProps = {
  users: {
    id: string;
    image?: string | null;
    name?: string | null;
    email?: string | null;
    role?: 'ADMIN' | 'USER' | null;
  }[];
};

const Home = ({ users }: HomeProps) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  console.log('#### apollo data', { users });
  return (
    <>
      <Heading textAlign={'center'}>Welcome to Esea.app</Heading>
      <Box maxW={500} mx={'auto'} mt={8}>
        <Stack as={'form'} spacing={3} onSubmit={handleSubmit(onSubmit)}>
          <Input type='text' placeholder='User' {...register('user')} />
          <Input
            type='password'
            placeholder='Password'
            {...register('password')}
          />
          <Button type='submit'>Submit</Button>
        </Stack>
      </Box>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const { data } = await apolloClient.query({ query: allUsersQuery });
  return {
    props: {
      users: data?.users,
    },
  };
};
