import { EventProps } from '@/core/types/event';
import ContentBox from '@/kit/Box/ContentBox';
import Table from '@/kit/Table/Table';
import { Heading } from '@chakra-ui/react';
import { columns } from './utils';

type EventiTableProps = {
  events: EventProps[];
};
const EventiTable = ({ events }: EventiTableProps) => {
  return (
    <ContentBox>
      <Heading variant={'h2'}>Lista prenotazioni</Heading>
      <Table columns={columns} data={events} />
    </ContentBox>
  );
};

export default EventiTable;
