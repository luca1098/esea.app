import React from 'react';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import { GetSessionParams, getSession, useSession } from 'next-auth/react';
import PageTitle from '@/kit/Text/PageTitle';
import { Grid, GridItem } from '@chakra-ui/react';
import AziendaBox from '@/components/pages/Gestione/Overview/AziendaBox';
import ProfiloBox from '@/components/pages/Gestione/Overview/ProfiloBox';
import { CompanyProps } from '@/core/types/company';
import { personaleMok } from 'mok';
import { PropsWithUser } from '@/core/types/user';
import UltimiAccreditiBox from '@/components/pages/Gestione/Overview/UltimiAccreditiBox';

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

type GestioneProps = PropsWithUser;

const Gestione = ({ user }: GestioneProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          <UltimiAccreditiBox />
        </GridItem>
      </Grid>
    </GestioneLayout>
  );
};

export default Gestione;

export const getServerSideProps = async (ctx: GetSessionParams) => {
  const session = await getSession(ctx);
  if (session) {
    return {
      props: {
        user: session.user,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/sign-in',
    },
  };
};
