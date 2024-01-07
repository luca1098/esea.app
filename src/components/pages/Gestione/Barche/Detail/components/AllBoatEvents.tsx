import EventiTable from '@/components/pages/shared/components/EventiTable';
import { EventProps } from '@/core/types/event';
import { Heading } from '@chakra-ui/react';

type AllBoatEventsProps = {
  isLoading?: boolean;
  events: EventProps[];
};

const AllBoatEvents = ({ events, isLoading }: AllBoatEventsProps) => {
  return (
    <>
      <Heading variant={'h3'} as={'h3'}>
        Tutte le prenotazioni
      </Heading>
      <EventiTable events={events} isLoading={!!isLoading} />
    </>
  );
};

export default AllBoatEvents;
