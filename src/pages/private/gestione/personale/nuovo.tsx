import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import NuovoPersonaleForm from '@/components/pages/Gestione/Personale/NuovoPersonaleForm';
import { PropsWithUser } from '@/core/types/user';
import ContentBox from '@/kit/Box/ContentBox';
import BackButton from '@/kit/Button/BackButton';
import PageTitle from '@/kit/Text/PageTitle';
import { GetSessionParams, getSession, useSession } from 'next-auth/react';

const Nuovo = ({ user }: PropsWithUser) => {
  const { data: session } = useSession();
  return (
    <GestioneLayout user={session?.user}>
      <PageTitle title='Aggiungi collaboratore' endElement={<BackButton />} />
      <ContentBox>
        <NuovoPersonaleForm user={user} />
      </ContentBox>
    </GestioneLayout>
  );
};

export default Nuovo;

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
