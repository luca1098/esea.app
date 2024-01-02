import BoatCell from '@/components/Table/BoatCell';
import RowActions, { RowActionsProps } from '@/components/Table/RowActions';
import StatusEventCell from '@/components/Table/StatusEventCell';
import { EventProps } from '@/core/types/event';
import { formatCurrency } from '@/core/utils/currencies';
import { formatDateTimeFromTimestamp } from '@/core/utils/date';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<EventProps>();

type ColumnsProps = {
  isLoading: boolean;
} & Pick<RowActionsProps<EventProps>, 'onDelete' | 'onEdit'>;

export const getColumns = ({
  isLoading,
  onDelete,
  onEdit,
}: ColumnsProps): ColumnDef<EventProps, never>[] => [
  columnHelper.accessor('boat.name', {
    cell: (info) => (
      <BoatCell
        name={info.row.original.boat?.name}
        image={info.row.original.boat?.image}
      />
    ),
    header: 'Barca',
  }),
  columnHelper.accessor('from', {
    cell: (info) => formatDateTimeFromTimestamp(info.getValue()),
    header: 'Da',
  }),
  columnHelper.accessor('to', {
    cell: (info) => formatDateTimeFromTimestamp(info.getValue()),
    header: 'A',
  }),
  columnHelper.accessor('service.label', {
    cell: (info) => info.getValue() || '-',
    header: 'Servizio',
  }),
  columnHelper.accessor('skipper.name', {
    cell: (info) => info.getValue() || '-',
    header: 'Skipper',
  }),
  columnHelper.accessor('canale.label', {
    cell: (info) => info.getValue() || '-',
    header: 'Canale',
  }),
  columnHelper.accessor('amount', {
    cell: (info) => formatCurrency(info.getValue()),
    header: 'Prezzo',
  }),
  columnHelper.accessor('status', {
    cell: (info) => <StatusEventCell type={info.getValue()} />,
    header: 'Stato',
  }),
  columnHelper.accessor('statusDetails', {
    cell: (info) => info.getValue(),
    header: 'Dettaglio',
  }),
  columnHelper.accessor('note', {
    cell: (info) => info.getValue() || '-',
    header: 'Note',
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props) => (
      <RowActions
        row={props.row}
        onDelete={onDelete}
        onEdit={onEdit}
        isLoading={isLoading}
      />
    ),
  }),
];
