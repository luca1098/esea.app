import React from 'react';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import { GetSessionParams, getSession, useSession } from 'next-auth/react';
import PageTitle from '@/kit/Text/PageTitle';
import { Grid, GridItem } from '@chakra-ui/react';
import AziendaBox from '@/components/pages/Gestione/Overview/AziendaBox';
import ProfiloBox from '@/components/pages/Gestione/Overview/ProfiloBox';
import { PropsWithUser } from '@/core/types/user';
import UltimiAccreditiBox from '@/components/pages/Gestione/Overview/UltimiAccreditiBox';
import { useCompany } from '@/components/pages/shared/queries';

type GestioneProps = PropsWithUser;

const Gestione = ({ user }: GestioneProps) => {
  const { data } = useSession();
  const { data: company, loading } = useCompany(data?.user?.companyId ?? '');

  return (
    <GestioneLayout user={user} company={company} isCompanyLoading={loading}>
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
          <AziendaBox company={company} />
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
