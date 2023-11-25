import InserisciForm from '@/components/pages/Gestione/Barche/InserisciForm';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import BackButton from '@/kit/Button/BackButton';
import PageTitle from '@/kit/Text/PageTitle';
import { useSession } from 'next-auth/react';
import React from 'react';

const Inserisci = () => {
  const { data } = useSession();
  return (
    <GestioneLayout user={data?.user}>
      <PageTitle
        title='Inserisci una nuova barca'
        endElement={<BackButton />}
      />
      <InserisciForm user={data?.user} />
    </GestioneLayout>
  );
};

export default Inserisci;
