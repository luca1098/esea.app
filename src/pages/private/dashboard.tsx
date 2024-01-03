import { Box, Heading, Stack } from '@chakra-ui/react';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import { useSession } from 'next-auth/react';
import { useCompany } from '@/components/pages/shared/queries';

const Profilo = () => {
  const { data: session } = useSession();
  const { data: company } = useCompany(session?.user?.companyId ?? '');
  return (
    <PrivateLayout user={session?.user} company={company}>
      <Stack spacing={2}>
        <Heading textAlign={'center'}>Profilo, {session?.user?.name}</Heading>
        <Box></Box>
      </Stack>
    </PrivateLayout>
  );
};

export default Profilo;
