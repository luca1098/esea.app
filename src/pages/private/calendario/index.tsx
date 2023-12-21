import BookingCalendar from '@/components/Calendar/BookingCalendar/BookingCalendar';
import NuovoEventoDrawer from '@/components/Events/NuovoEventoDrawer';
import {
  AddEventsArgs,
  NuovoEventoFormProps,
  NuovoEventoFormSchema,
} from '@/core/types/event';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import { useCalendarioParametri } from '@/components/pages/Calendario/queries';
import { useAddEvent, useCanali } from '@/components/pages/shared/queries';
import { BoatProps } from '@/core/types/barca';
import { PropsWithUser } from '@/core/types/user';
import { dateToTimestamp } from '@/core/utils/date';
import ContentBox from '@/kit/Box/ContentBox';
import PageTitle from '@/kit/Text/PageTitle';
import { useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { personaleMok } from 'mok';
import { GetSessionParams, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useResponseToast from '@/core/hooks/useResponseToast';

type CalendarioProps = PropsWithUser;

const Calendario = ({ user }: CalendarioProps) => {
  const methods = useForm<NuovoEventoFormProps>({
    resolver: zodResolver(NuovoEventoFormSchema),
  });
  const { isOpen: isDrawerOpen, onOpen, onClose } = useDisclosure();
  const { errorToast, successToast } = useResponseToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: parametri, loading: parametriLoading } = useCalendarioParametri(
    {
      email: user?.email || '',
    },
  );
  const { data: canali } = useCanali();

  const [selectedBoat, setSelectedBoat] = useState<BoatProps | null>();
  const [selectedDataFrom, setSelectedDataFrom] = useState<Date | null>();

  const [addEvent, { loading: addEventLoading }] = useAddEvent(
    selectedBoat?.id || '',
  );

  useEffect(() => {
    if (selectedBoat && selectedDataFrom) onOpen();
  }, [selectedBoat, selectedDataFrom, onOpen]);

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
        canaleId: values?.canale,
        from: timestampFrom,
        to: timestampTo,
        skipperId: values.skipper,
        boatId: selectedBoat?.id,
        clientId: null,
        people: values.clientPeople ? Number(values.clientPeople) : null,
        note: values.note,
      };
      const { data, errors } = await addEvent({ variables: { args } });
      if (errors || !data.createEvents.valido) {
        errorToast(errors, data.createEvents);
      } else {
        successToast(data.createEvents);
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
            boats={parametri?.boats || []}
            setSelectedBoat={setSelectedBoat}
            setSelectedDataFrom={setSelectedDataFrom}
            isLoading={parametriLoading}
          />
        </ContentBox>
      </PrivateLayout>
      <NuovoEventoDrawer
        isOpen={isDrawerOpen}
        onClose={handleClose}
        selectedDateFrom={selectedDataFrom}
        selectedBoat={selectedBoat}
        personale={personaleMok}
        onCreate={handleCreateEvent}
        isLoading={addEventLoading}
        methods={methods}
        canali={canali || []}
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
