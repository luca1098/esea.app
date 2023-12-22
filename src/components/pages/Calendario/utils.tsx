import BoatCell from '@/components/Table/BoatCell';
import StatusEventCell from '@/components/Table/StatusEventCell';
import { EventProps } from '@/core/types/event';
import { formatCurrency } from '@/core/utils/currencies';
import { formatDateTime } from '@/core/utils/date';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<EventProps>();

export const columns: ColumnDef<EventProps, never>[] = [
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
    cell: (info) => formatDateTime(info.getValue()),
    header: 'Da',
  }),
  columnHelper.accessor('to', {
    cell: (info) => formatDateTime(info.getValue()),
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
  columnHelper.accessor('details', {
    cell: (info) => info.getValue(),
    header: 'Dettaglio',
  }),
  columnHelper.accessor('note', {
    cell: (info) => info.getValue() || '-',
    header: 'Note',
  }),
];
