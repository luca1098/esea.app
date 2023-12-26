import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import CardPersonale from '@/components/pages/Gestione/Personale/CardPersonale';
import { usePersonale } from '@/components/pages/Gestione/Personale/queries';
import { navigation } from '@/core/config/navigation';
import { PersonaleProps } from '@/core/types/personale';
import { PropsWithUser } from '@/core/types/user';
import ContentBox from '@/kit/Box/ContentBox';
import Button from '@/kit/Button/Button';
import PageTitle from '@/kit/Text/PageTitle';
import { Grid, GridItem } from '@chakra-ui/react';
import { GetSessionParams, getSession } from 'next-auth/react';

type PersonalePageProps = PropsWithUser;

const Personale = ({ user }: PersonalePageProps) => {
  const { data: personale } = usePersonale(user?.companyId ?? '');
  return (
    <GestioneLayout user={user}>
      <PageTitle
        title='Personale'
        endElement={
          <Button
            label='Aggiungi personale'
            variant='outline'
            href={navigation.private.gestione.personale.nuovo}
          />
        }
      />
      <ContentBox>
        <Grid
          gap={4}
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
        >
          {(personale || []).map((p: PersonaleProps) => (
            <GridItem key={p.id}>
              <CardPersonale person={p} />
            </GridItem>
          ))}
        </Grid>
      </ContentBox>
    </GestioneLayout>
  );
};

export default Personale;

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
