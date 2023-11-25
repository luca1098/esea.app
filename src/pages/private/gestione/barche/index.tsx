import CardBarche from '@/components/Card/CardBarche';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import { Flex, Heading } from '@chakra-ui/react';
import { GetSessionParams, getSession, useSession } from 'next-auth/react';
import React from 'react';
import BARCA_IMG from '@/assets/barca-test.webp';
import PageTitle from '@/kit/Text/PageTitle';
import Button from '@/kit/Button/Button';
import { navigation } from '@/core/config/navigation';
import apolloClient from '@/lib/apollo';
import { gestioneParametriQuery } from '@/graphql/queries/gestione';
import { CardBarcheProps } from '@/components/Card/types';
import { useQuery } from '@apollo/client';
import { useGestioneParametri } from '@/components/pages/Gestione/queries';

const Barche = () => {
  const { data: session } = useSession();
  const { loading, error, data } = useGestioneParametri({
    email: session?.user?.email || '',
  });

  const { gestioneParametri } = data || {};
  console.log({ loading, error, data });
  return (
    <GestioneLayout user={session?.user}>
      <PageTitle
        title='Barche'
        endElement={
          <Button
            label='Inserisci una nuova barca'
            variant='outline'
            href={navigation.private.gestione.barche.inserisci}
          />
        }
      />
      <Flex gap={2} flexWrap={'wrap'}>
        {gestioneParametri?.boats
          ? gestioneParametri?.boats?.map((boat: CardBarcheProps) => (
              <CardBarche key={boat.id} name={boat.name} image={boat.image} />
            ))
          : 'inserisci la tua prima barca '}
      </Flex>
    </GestioneLayout>
  );
};

export default Barche;

export const getServerSideProps = async (ctx: GetSessionParams) => {
  const session = await getSession(ctx);
  if (session) {
    const { data } = await apolloClient.query({
      query: gestioneParametriQuery,
      variables: {
        email: session?.user.email,
      },
    });
    return {
      props: {
        user: session.user,
        boats: data?.gestioneParametri?.boats || [],
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
