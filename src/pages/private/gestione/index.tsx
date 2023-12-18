import React from 'react';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import { GetSessionParams, getSession, useSession } from 'next-auth/react';
import ContentBox from '@/kit/Box/ContentBox';
import PageTitle from '@/kit/Text/PageTitle';
import { Grid, GridItem, Heading, Stack } from '@chakra-ui/react';
import AziendaBox from '@/components/pages/Gestione/Overview/AziendaBox';
import ProfiloBox from '@/components/pages/Gestione/Overview/ProfiloBox';
import { CompanyProps } from '@/core/types/company';
import { personaleMok } from 'mok';
import { UserExtended } from '@/core/types/user';

const user: UserExtended = {
  name: 'Test',
  email: 'test@email.it',
  image: '',
  role: 'OWNER',
  id: '#id',
  cellulare: '3881849774',
  birthday: 787104000000,
  paymentMethod: 'CARD',
  plan: 'BASIC',
};

const companyMok: CompanyProps = {
  name: 'Unavitavistamare',
  id: 'unas-12312x',
  employees: personaleMok.map(({ id, image, name }) => ({ id, image, name })),
  boats: [],
  owner: {
    id: 'ownber-id',
    name: 'Luca La Marca',
  },
};
const Gestione = () => {
  const { data } = useSession();
  return (
    <GestioneLayout user={user}>
      <PageTitle title='Gestione' />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <ProfiloBox user={user} />
        </GridItem>
        <GridItem colSpan={1}>
          <AziendaBox company={companyMok} />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2, lg: 3 }}>
          <ContentBox>
            <Heading as={'h3'} variant={'h3'}>
              Ultimi accrediti
            </Heading>
          </ContentBox>
        </GridItem>
      </Grid>
    </GestioneLayout>
  );
};

export default Gestione;
