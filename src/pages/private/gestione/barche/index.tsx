import CardBarche from '@/components/Card/CardBarche';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import { Flex } from '@chakra-ui/react';
import { GetSessionParams, getSession } from 'next-auth/react';
import React from 'react';
import PageTitle from '@/kit/Text/PageTitle';
import Button from '@/kit/Button/Button';
import { navigation } from '@/core/config/navigation';

import { CardBarcheProps } from '@/components/Card/types';
import { useRemoveBoat } from '@/components/pages/Gestione/queries';
import useResponseToast from '@/core/hooks/useResponseToast';
import { useCompany } from '@/components/pages/shared/queries';
import { PropsWithUser } from '@/core/types/user';
import ContentBox from '@/kit/Box/ContentBox';
import EmptyBox from '@/components/Empty/EmptyBox';

type BarcheProps = PropsWithUser;

const Barche = ({ user }: BarcheProps) => {
  const { errorToast, successToast } = useResponseToast();

  const { data: company, loading: companyLoading } = useCompany(
    user?.companyId ?? '',
  );

  const [removeBoat, { loading }] = useRemoveBoat(user?.companyId ?? '');

  const handleDelete = async (id: string) => {
    const { data, errors } = await removeBoat({ variables: { boatId: id } });
    if (errors || !data?.deleteBoat) {
      errorToast(errors, data?.deleteBoat);
    } else {
      successToast(data?.deleteBoat);
    }
  };

  return (
    <GestioneLayout
      user={user}
      company={company}
      isCompanyLoading={companyLoading}
    >
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
      <ContentBox>
        <Flex gap={2} flexWrap={'wrap'}>
          {company?.boats?.length ? (
            company?.boats?.map((boat: CardBarcheProps) => (
              <CardBarche
                key={boat.id}
                id={boat.id}
                name={boat.name}
                image={boat.image ?? ''}
                onDelete={handleDelete}
                isDeleteLoading={loading}
              />
            ))
          ) : (
            <EmptyBox msg='Ancora nessuna barca inserita' />
          )}
        </Flex>
      </ContentBox>
    </GestioneLayout>
  );
};

export default Barche;

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
