import Modal from '@/components/Modal/Modal';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import CardPersonale from '@/components/pages/Gestione/Personale/CardPersonale';
import {
  useDeletePersonale,
  usePersonale,
} from '@/components/pages/Gestione/Personale/queries';
import { useCompany } from '@/components/pages/shared/queries';
import { navigation } from '@/core/config/navigation';
import useResponseToast from '@/core/hooks/useResponseToast';
import { PersonaleProps } from '@/core/types/personale';
import { PropsWithUser } from '@/core/types/user';
import ContentBox from '@/kit/Box/ContentBox';
import Button, { ButtonProps } from '@/kit/Button/Button';
import PageTitle from '@/kit/Text/PageTitle';
import { Grid, GridItem, useDisclosure, Text } from '@chakra-ui/react';
import { GetSessionParams, getSession } from 'next-auth/react';
import { useState } from 'react';

type PersonalePageProps = PropsWithUser;

const Personale = ({ user }: PersonalePageProps) => {
  const [selectedPersonaleId, setSelectedPersonaleId] = useState<string | null>(
    null,
  );
  const { data: company, loading: companyLoading } = useCompany(
    user?.companyId ?? '',
  );

  const { successToast, errorToast } = useResponseToast();
  const { isOpen, onClose: closeModal, onOpen: openModal } = useDisclosure();
  const { data: personale } = usePersonale(user?.companyId ?? '');

  const [deletePersonale, { loading }] = useDeletePersonale(
    user?.companyId ?? '',
  );

  const handleDelete = (personaleId: string) => {
    setSelectedPersonaleId(personaleId);
    openModal();
  };

  const handleModalClose = () => {
    setSelectedPersonaleId(null);
    closeModal();
  };

  const handleConfirm = async () => {
    if (!selectedPersonaleId)
      errorToast([], {
        valido: false,
        message: 'Errore durante la selezione del collaboratore',
      });

    const { data, errors } = await deletePersonale({
      variables: { id: selectedPersonaleId },
    });

    closeModal();

    if (errors || !data.deletePersonale.valido) {
      errorToast(errors, data.deletePersonale);
    } else {
      successToast(data.deletePersonale);
    }
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
      onClick: handleConfirm,
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
              <CardPersonale person={p} onDelete={handleDelete} />
            </GridItem>
          ))}
        </Grid>
      </ContentBox>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        actionButtons={actionsButtons}
        title='Elimina collaboratore'
      >
        <Text>
          Sei sicuro di voler rimuovere questo collaboratore dalla lista?
          <br />
          L&apos;azione non sarà reversibile
        </Text>
      </Modal>
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
