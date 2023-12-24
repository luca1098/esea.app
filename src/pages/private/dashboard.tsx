import { Box, Heading, Stack } from '@chakra-ui/react';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import { useSession } from 'next-auth/react';

const Profilo = () => {
  const { data: session } = useSession();
  return (
    <PrivateLayout user={session?.user}>
      <Stack spacing={2}>
        <Heading textAlign={'center'}>Profilo, {session?.user?.name}</Heading>
        <Box></Box>
      </Stack>
    </PrivateLayout>
  );
};

export default Profilo;
