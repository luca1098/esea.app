import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import NuovoPersonaleForm from '@/components/pages/Gestione/Personale/NuovoPersonaleForm';
import ContentBox from '@/kit/Box/ContentBox';
import BackButton from '@/kit/Button/BackButton';
import PageTitle from '@/kit/Text/PageTitle';
import { useSession } from 'next-auth/react';

const Nuovo = () => {
  const { data: session } = useSession();
  return (
    <GestioneLayout user={session?.user}>
      <PageTitle title='Aggiungi collaboratore' endElement={<BackButton />} />
      <ContentBox>
        <NuovoPersonaleForm />
      </ContentBox>
    </GestioneLayout>
  );
};

export default Nuovo;
