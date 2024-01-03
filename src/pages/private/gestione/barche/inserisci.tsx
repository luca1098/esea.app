import InserisciForm from '@/components/pages/Gestione/Barche/InserisciForm';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import { useCompany } from '@/components/pages/shared/queries';
import ContentBox from '@/kit/Box/ContentBox';
import BackButton from '@/kit/Button/BackButton';
import PageTitle from '@/kit/Text/PageTitle';
import { Box, Divider, Flex, Heading } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';

const Inserisci = () => {
  const { data } = useSession();
  const { data: company } = useCompany(data?.user?.companyId ?? '');
  return (
    <GestioneLayout user={data?.user} company={company}>
      <PageTitle
        title='Inserisci una nuova barca'
        endElement={<BackButton />}
      />
      <Flex as={ContentBox} gap={4} direction={{ base: 'column', lg: 'row' }}>
        <InserisciForm user={data?.user} />
        <Divider orientation={'vertical'} h={400} hideBelow={'lg'} />
        <Divider orientation={'horizontal'} hideFrom={'lg'} />
        <Box flex={1}>
          <Heading variant={'h4'}>Anteprima</Heading>
        </Box>
      </Flex>
    </GestioneLayout>
  );
};

export default Inserisci;
