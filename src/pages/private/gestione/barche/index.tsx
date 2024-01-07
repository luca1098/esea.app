import CardBarche from '@/components/Card/CardBarche';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import { Flex, useDisclosure, Text } from '@chakra-ui/react';
import { GetSessionParams, getSession } from 'next-auth/react';
import React, { useState } from 'react';
import PageTitle from '@/kit/Text/PageTitle';
import Button, { ButtonProps } from '@/kit/Button/Button';
import { navigation } from '@/core/config/navigation';

import { CardBarcheProps } from '@/components/Card/types';
import { useRemoveBoat } from '@/components/pages/Gestione/queries';
import useResponseToast from '@/core/hooks/useResponseToast';
import { useCompany } from '@/components/pages/shared/queries';
import { PropsWithUser } from '@/core/types/user';
import ContentBox from '@/kit/Box/ContentBox';
import EmptyBox from '@/components/Empty/EmptyBox';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/router';

type BarcheProps = PropsWithUser;

const Barche = ({ user }: BarcheProps) => {
  const router = useRouter();
  const { errorToast, successToast } = useResponseToast();
  const {
    isOpen: isDeleteModalOpen,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();
  const [selectedBoatId, setSelectedBoatId] = useState<string | null>(null);

  const { data: company, loading: companyLoading } = useCompany(
    user?.companyId ?? '',
  );

  const [removeBoat, { loading }] = useRemoveBoat(user?.companyId ?? '');

  const handleDeleteClick = async (id: string) => {
    setSelectedBoatId(id);
    onOpenDeleteModal();
  };
  const deleteBoat = async () => {
    const { data, errors } = await removeBoat({
      variables: { boatId: selectedBoatId },
    });
    if (errors || !data?.deleteBoat) {
      errorToast(errors, data?.deleteBoat);
    } else {
      successToast(data?.deleteBoat);
      onCloseDeleteModal();
    }
  };

  const handleDetailClick = (id: string) => {
    router.push(`${navigation.private.gestione.barche.index}/${id}`);
  };

  const handleModalClose = () => {
    setSelectedBoatId(null);
    onCloseDeleteModal();
  };

  const actionsButtons: ButtonProps[] = [
    {
      label: 'Annulla',
      variant: 'outline',
      onClick: handleModalClose,
      disabled: loading,
    },
    {
      label: 'Elimina',
      variant: 'solid',
      onClick: deleteBoat,
      disabled: loading,
    },
  ];
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
                onDelete={handleDeleteClick}
                onDetailClick={handleDetailClick}
                isDeleteLoading={loading}
              />
            ))
          ) : (
            <EmptyBox msg='Ancora nessuna barca inserita' />
          )}
        </Flex>
      </ContentBox>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleModalClose}
        actionButtons={actionsButtons}
        title='Elimina barca definitivamente'
      >
        <Text>
          Sei sicuro di voler eliminare questa barca definitivamente?
          <br />
          L&apos;azione sarà irreversibile
        </Text>
      </Modal>
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
