import BookingCalendar from '@/components/Calendar/BookingCalendar/BookingCalendar';
import NuovoEventoDrawer from '@/components/Events/NuovoEventoDrawer';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import { useCalendarioParametri } from '@/components/pages/Calendario/queries';
import { BoatProps } from '@/core/shared/types/barca';
import { PersonaleBaseSchema } from '@/core/shared/types/personale';
import { PropsWithUser } from '@/core/shared/types/user';
import ContentBox from '@/kit/Box/ContentBox';
import PageTitle from '@/kit/Text/PageTitle';
import { useDisclosure } from '@chakra-ui/react';
import { fakeBoats, fakeUser, personaleMok } from 'mok';
import { GetSessionParams, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type CalendarioProps = PropsWithUser;

const Calendario = ({ user }: CalendarioProps) => {
  const { isOpen: isDrawerOpen, onOpen, onClose } = useDisclosure();
  const { data } = useCalendarioParametri({
    email: user?.email || '',
  });

  const [selectedBoat, setSelectedBoat] = useState<BoatProps | null>();
  const [selectedDataFrom, setSelectedDataFrom] = useState<Date | null>();

  useEffect(() => {
    if (selectedBoat && selectedDataFrom) onOpen();
  }, [selectedBoat, selectedDataFrom, onOpen]);

  const { calendarioParametri } = data || {};

  const handleClose = () => {
    setSelectedBoat(null);
    setSelectedDataFrom(null);
    onClose();
  };

  console.log('###', { selectedBoat, selectedDataFrom });

  return (
    <>
      <PrivateLayout user={fakeUser}>
        <PageTitle title='Calendario' />
        <ContentBox>
          <BookingCalendar
            boats={calendarioParametri?.boats || fakeBoats}
            setSelectedBoat={setSelectedBoat}
            setSelectedDataFrom={setSelectedDataFrom}
          />
        </ContentBox>
      </PrivateLayout>
      <NuovoEventoDrawer
        isOpen={isDrawerOpen}
        onClose={handleClose}
        selectedDate={selectedDataFrom}
        selectedBoat={selectedBoat}
        setSelectedBoat={setSelectedBoat}
        personale={personaleMok}
      />
    </>
  );
};

export default Calendario;

// export const getServerSideProps = async (ctx: GetSessionParams) => {
// const session = await getSession(ctx);
// if (session) {
//   return {
//     props: {
//       user: session.user,
//     },
//   };
// }
// return {
//   redirect: {
//     permanent: false,
//     destination: '/sign-in',
//   },
// };
// };
