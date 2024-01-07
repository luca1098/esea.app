import { EventProps } from '@/core/types/event';
import Table from '@/kit/Table/Table';
import { getColumns } from '../../Calendario/utils';
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
    <Table
      columns={getColumns({ onDelete, onEdit, isLoading })}
      data={events}
    />
  );
};

export default EventiTable;
