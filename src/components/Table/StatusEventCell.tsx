import { StatusTypeProps } from '@/core/types/event';
import { Badge, ThemingProps } from '@chakra-ui/react';

type StatusConfigProps = {
  label: string;
  colorschema: ThemingProps['colorScheme'];
};

const statusEventConfig: Record<StatusTypeProps, StatusConfigProps> = {
  PAYED: {
    label: 'Pagato',
    colorschema: 'green',
  },
  ADVANCE_PAYMENT: {
    label: 'Acconto',
    colorschema: 'yellow',
  },
  TO_PAY: {
    label: 'Da pagare',
    colorschema: 'red',
  },
  NONE: {
    label: 'Nessuno',
    colorschema: 'gray',
  },
};

type StatusEventCellProps = {
  type: StatusTypeProps;
};
const StatusEventCell = ({ type }: StatusEventCellProps) => {
  return (
    <Badge colorScheme={statusEventConfig[type].colorschema}>
      {statusEventConfig[type].label}
    </Badge>
  );
};

export default StatusEventCell;
