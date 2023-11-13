import { Heading, Stack } from '@chakra-ui/react';
import Link from 'next/link';

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
  return (
    <>
      <Heading textAlign={'center'}>Welcome to Esea.app</Heading>
      <Stack alignItems={'center'} justifyContent={'center'}>
        <Link href={'/sign-in'}>Login</Link>
      </Stack>
    </>
  );
};

export default Home;
