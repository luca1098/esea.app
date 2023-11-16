import Layout from '@/kit/Layout/Layout';
import { Heading, Stack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

type HomeProps = {};

const Home = (props: HomeProps) => {
  const { data: session } = useSession();
  return (
    <Layout user={session?.user}>
      <Heading textAlign={'center'}>Landing Esea.app </Heading>
      <Stack alignItems={'center'} justifyContent={'center'}></Stack>
    </Layout>
  );
};

export default Home;
