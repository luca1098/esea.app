import BookingCalendar from '@/components/Calendar/BookingCalendar/BookingCalendar';
import NuovoEventoDrawer from '@/components/Events/NuovoEventoDrawer';
import {
  AddEventsArgs,
  EventProps,
  NuovoEventoFormProps,
  NuovoEventoFormSchema,
} from '@/core/types/event';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import { useCalendarioParametri } from '@/components/pages/Calendario/queries';
import {
  useAddEvent,
  useCanali,
  useCompanyEvent,
  useDeleteEvent,
} from '@/components/pages/shared/queries';
import { BoatProps } from '@/core/types/barca';
import { PropsWithUserExtended } from '@/core/types/user';
import { dateToTimestamp } from '@/core/utils/date';
import ContentBox from '@/kit/Box/ContentBox';
import PageTitle from '@/kit/Text/PageTitle';
import { Stack, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { personaleMok } from 'mok';
import { GetSessionParams, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useResponseToast from '@/core/hooks/useResponseToast';
import EventiTable from '@/components/pages/Calendario/EventiTable';
import { CellContext } from '@tanstack/react-table';
import {
  BOAT_EVENT_QUERY,
  COMPANY_EVENT_QUERY,
} from '@/graphql/queries/events';

type CalendarioProps = PropsWithUserExtended;

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
  const { data: allEvents } = useCompanyEvent(user?.companyId || '');
  const { data: canali } = useCanali();
  const [selectedBoat, setSelectedBoat] = useState<BoatProps | null>();
  const [selectedDataFrom, setSelectedDataFrom] = useState<Date | null>();

  const [addEvent, { loading: addEventLoading }] = useAddEvent(
    selectedBoat?.id || '',
    user?.companyId || '',
  );
  const [deleteEvent, { loading: deleteEventLoading }] = useDeleteEvent();

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
        serviceId: values.service,
        canaleId: values?.canale,
        from: timestampFrom,
        to: timestampTo,
        skipperId: values.skipper,
        boatId: selectedBoat?.id,
        clientId: null,
        people: values.clientPeople ? Number(values.clientPeople) : null,
        note: values.note,
        companyId: user?.companyId,
        status: values.status,
        amount: values.amount,
        statusDetails: values.statusDetails,
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

  const handleDeleteEvent = async (
    row: CellContext<EventProps, never>['row'],
  ) => {
    const { data, errors } = await deleteEvent({
      variables: { id: row.original.id },
      refetchQueries: [
        {
          query: BOAT_EVENT_QUERY,
          variables: {
            boatId: row.original.boat?.id,
          },
        },
        {
          query: COMPANY_EVENT_QUERY,
          variables: {
            companyId: row.original.companyId,
          },
        },
      ],
    });
    if (errors || !data.deleteEvents.valido) {
      errorToast(errors, data.deleteEvents);
    } else {
      successToast(data.deleteEvents);
      methods.reset({});
      onClose();
    }
  };

  return (
    <>
      <PrivateLayout user={user}>
        <PageTitle title='Calendario' />
        <Stack gap={3}>
          <ContentBox>
            <BookingCalendar
              boats={parametri?.boats || []}
              setSelectedBoat={setSelectedBoat}
              setSelectedDataFrom={setSelectedDataFrom}
              isLoading={parametriLoading}
            />
          </ContentBox>

          <EventiTable
            events={allEvents || []}
            onDelete={handleDeleteEvent}
            isLoading={deleteEventLoading}
          />
        </Stack>
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
