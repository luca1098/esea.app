import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { AccreditoProps, AccreditoStatusTypes } from './schemas';
import { formatDate } from '@/core/utils/date';
import { paymentMethodConfig } from '@/components/Payments/utils';
import { formatCurrency } from '@/core/utils/currencies';
import { Badge, ThemingProps } from '@chakra-ui/react';
import { PaymentMethodsType } from '@/core/types/payments';

type AccreditoStatusObjProps = {
  label: string;
  colorSchema: ThemingProps['colorScheme'];
};

const accreditoStatusConfig: Record<
  AccreditoStatusTypes,
  AccreditoStatusObjProps
> = {
  SUCCESS: {
    label: 'Successo',
    colorSchema: 'green',
  },
  ERROR: {
    label: 'Errore',
    colorSchema: 'red',
  },
  PENDING: {
    label: 'In corso',
    colorSchema: 'gray',
  },
};

const columnHelper = createColumnHelper<AccreditoProps>();

export const columns: ColumnDef<AccreditoProps, never>[] = [
  columnHelper.accessor<'id', string>('id', {
    header: 'Id ',
    cell: (info) => `#${info.getValue()}`,
    enableSorting: false,
  }),
  columnHelper.accessor<'paymentDate', number>('paymentDate', {
    cell: (info) => formatDate(info.getValue()),
    header: 'Data pagamento',
  }),
  columnHelper.accessor('amount', {
    cell: (info) => formatCurrency(info.getValue()),
    header: 'Importo',
  }),
  columnHelper.accessor<'method', PaymentMethodsType>('method', {
    cell: (info) => paymentMethodConfig[info?.getValue()].label,
    header: 'Metodo',
  }),
  columnHelper.accessor<'status', AccreditoStatusTypes>('status', {
    cell: (info) => (
      <Badge colorScheme={accreditoStatusConfig[info?.getValue()]?.colorSchema}>
        {accreditoStatusConfig[info?.getValue()]?.label}
      </Badge>
    ),
    header: 'Stato',
  }),
];
