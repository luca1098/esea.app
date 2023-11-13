import { Heading, Stack } from '@chakra-ui/react';
import Link from 'next/link';

const Home = () => {
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
