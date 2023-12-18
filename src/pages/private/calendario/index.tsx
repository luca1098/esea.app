import BookingCalendar from '@/components/Calendar/BookingCalendar/BookingCalendar';
import NuovoEventoDrawer from '@/components/Events/NuovoEventoDrawer';
import {
  AddEventsArgs,
  NuovoEventoFormProps,
  NuovoEventoFormSchema,
} from '@/core/types/event';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import { useCalendarioParametri } from '@/components/pages/Calendario/queries';
import { useAddEvent } from '@/components/pages/shared/queries';
import { BoatProps } from '@/core/types/barca';
import { PropsWithUser } from '@/core/types/user';
import { dateToTimestamp } from '@/core/utils/date';
import ContentBox from '@/kit/Box/ContentBox';
import PageTitle from '@/kit/Text/PageTitle';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { personaleMok } from 'mok';
import { GetSessionParams, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type CalendarioProps = PropsWithUser;

const Calendario = ({ user }: CalendarioProps) => {
  const methods = useForm<NuovoEventoFormProps>({
    resolver: zodResolver(NuovoEventoFormSchema),
  });
  const { isOpen: isDrawerOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { data, loading } = useCalendarioParametri({
    email: user?.email || '',
  });

  console.log(data);

  const [selectedBoat, setSelectedBoat] = useState<BoatProps | null>();
  const [selectedDataFrom, setSelectedDataFrom] = useState<Date | null>();

  const [addEvent, { loading: addEventLoading }] = useAddEvent(
    selectedBoat?.id || '',
  );

  useEffect(() => {
    if (selectedBoat && selectedDataFrom) onOpen();
  }, [selectedBoat, selectedDataFrom, onOpen]);

  const { calendarioParametri } = data || {};

  const handleClose = () => {
    setSelectedBoat(null);
    setSelectedDataFrom(null);
    onClose();
  };

  const handleCreateEvent = async (values: NuovoEventoFormProps) => {
    const timestampFrom = dateToTimestamp(values.from);
    const timestampTo = dateToTimestamp(values.to);
    if (timestampFrom && timestampTo && selectedBoat?.id) {
      const args: AddEventsArgs = {
        serviceSlug: values.service,
        from: timestampFrom,
        to: timestampTo,
        skipperId: values.skipper,
        boatId: selectedBoat?.id,
        clientId: null,
        people: values.clientPeople ? Number(values.clientPeople) : null,
      };
      const { data, errors } = await addEvent({ variables: { args } });
      if (errors || !data.createEvents.valido) {
        toast({
          title: 'Errore',
          description: data?.createEvents?.message,
          status: 'error',
          isClosable: true,
        });
      } else {
        toast({
          title: 'Successo',
          description: data?.createEvents?.message,
          status: 'success',
          isClosable: true,
        });
        methods.reset({});
        onClose();
      }
    }
  };

  return (
    <>
      <PrivateLayout user={user}>
        <PageTitle title='Calendario' />
        <ContentBox>
          <BookingCalendar
            boats={calendarioParametri?.boats}
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
        personale={personaleMok}
        onCreate={handleCreateEvent}
        isLoading={addEventLoading}
        methods={methods}
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
