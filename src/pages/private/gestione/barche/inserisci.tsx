import InserisciForm from '@/components/pages/Gestione/Barche/InserisciForm';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import { useCompany } from '@/components/pages/shared/queries';
import ContentBox from '@/kit/Box/ContentBox';
import BackButton from '@/kit/Button/BackButton';
import PageTitle from '@/kit/Text/PageTitle';
import { useSession } from 'next-auth/react';
import React from 'react';

const Inserisci = () => {
  const { data } = useSession();
  const { data: company } = useCompany(data?.user?.companyId ?? '');
  return (
    <GestioneLayout user={data?.user} company={company}>
      <PageTitle
        title='Inserisci una nuova barca'
        endElement={<BackButton />}
      />
      <ContentBox>
        <InserisciForm user={data?.user} />
      </ContentBox>
    </GestioneLayout>
  );
};

export default Inserisci;
