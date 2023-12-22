import { EventProps } from '@/core/types/event';
import ContentBox from '@/kit/Box/ContentBox';
import Table from '@/kit/Table/Table';
import { Heading } from '@chakra-ui/react';
import { getColumns } from './utils';
import { RowActionsProps } from '@/components/Table/RowActions';

type EventiTableProps = {
  events: EventProps[];
  isLoading: boolean;
} & Pick<RowActionsProps<EventProps>, 'onDelete' | 'onEdit'>;

const EventiTable = ({
  events,
  isLoading,
  onDelete,
  onEdit,
}: EventiTableProps) => {
  return (
    <ContentBox>
      <Heading variant={'h2'}>Lista prenotazioni</Heading>
      <Table
        columns={getColumns({ onDelete, onEdit, isLoading })}
        data={events}
      />
    </ContentBox>
  );
};

export default EventiTable;
