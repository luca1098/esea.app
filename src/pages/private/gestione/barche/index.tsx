import CardBarche from '@/components/Card/CardBarche';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import { Flex, useToast } from '@chakra-ui/react';
import { GetSessionParams, getSession, useSession } from 'next-auth/react';
import React from 'react';
import PageTitle from '@/kit/Text/PageTitle';
import Button from '@/kit/Button/Button';
import { navigation } from '@/core/config/navigation';
import apolloClient from '@/lib/apollo';
import { gestioneParametriQuery } from '@/graphql/queries/gestione';
import { CardBarcheProps } from '@/components/Card/types';
import {
  useGestioneParametri,
  useRemoveBoat,
} from '@/components/pages/Gestione/queries';

const Barche = () => {
  const { data: session } = useSession();
  const toast = useToast();
  const { data } = useGestioneParametri({
    email: session?.user?.email || '',
  });

  const [removeBoat, { loading }] = useRemoveBoat({
    email: session?.user?.email || '',
  });

  const { gestioneParametri } = data || {};

  const handleDelete = async (id: string) => {
    const { data, errors } = await removeBoat({ variables: { boatId: id } });

    if (errors || !data?.deleteBoat?.valido) {
      toast({
        title: 'Errore',
        description: data?.deleteBoat?.message,
        status: 'error',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Successo',
        description: data?.deleteBoat?.message,
        status: 'success',
        isClosable: true,
      });
    }
  };

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
              <CardBarche
                key={boat.id}
                id={boat.id}
                name={boat.name}
                image={boat.image}
                onDelete={handleDelete}
                isDeleteLoading={loading}
              />
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
