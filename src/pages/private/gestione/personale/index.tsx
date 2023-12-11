import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import CardPersonale from '@/components/pages/Gestione/Personale/CardPersonale';
import { navigation } from '@/core/config/navigation';
import ContentBox from '@/kit/Box/ContentBox';
import Button from '@/kit/Button/Button';
import PageTitle from '@/kit/Text/PageTitle';
import { Grid, GridItem } from '@chakra-ui/react';
import { personaleMok } from 'mok';
import { useSession } from 'next-auth/react';

const Personale = () => {
  const { data: session } = useSession();
  return (
    <GestioneLayout user={session?.user}>
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
          {personaleMok.map((p) => (
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
