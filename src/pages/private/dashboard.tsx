import { Box, Heading, Stack } from '@chakra-ui/react';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import { getSession, useSession } from 'next-auth/react';

type DashboardProps = {};

const Dashboard = (props: DashboardProps) => {
  const { data: session } = useSession();
  return (
    <PrivateLayout user={session?.user}>
      <Stack spacing={2}>
        <Heading textAlign={'center'}>Welcome, {session?.user?.name}</Heading>
        <Box></Box>
      </Stack>
    </PrivateLayout>
  );
};

export default Dashboard;
