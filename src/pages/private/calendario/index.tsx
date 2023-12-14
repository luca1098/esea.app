import BookingCalendar from '@/components/Calendar/BookingCalendar/BookingCalendar';
import NuovoEventoDrawer from '@/components/Events/NuovoEventoDrawer';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import { useCalendarioParametri } from '@/components/pages/Calendario/queries';
import { PropsWithUser } from '@/core/shared/types/user';
import ContentBox from '@/kit/Box/ContentBox';
import PageTitle from '@/kit/Text/PageTitle';
import { useDisclosure } from '@chakra-ui/react';
import { GetSessionParams, getSession } from 'next-auth/react';

type CalendarioProps = PropsWithUser;

const Calendario = ({ user }: CalendarioProps) => {
  const { isOpen: isDrawerOpen, onOpen, onClose } = useDisclosure();
  const { data } = useCalendarioParametri({
    email: user?.email || '',
  });

  const { calendarioParametri } = data || {};

  return (
    <>
      <PrivateLayout user={user}>
        <PageTitle title='Calendario' />
        <ContentBox>
          <BookingCalendar
            boats={calendarioParametri?.boats}
            openCreateEventDrawer={onOpen}
          />
        </ContentBox>
      </PrivateLayout>
      <NuovoEventoDrawer
        isOpen={isDrawerOpen}
        onClose={onClose}
        selectedDate={new Date()}
      />
    </>
  );
};

export default Calendario;

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
