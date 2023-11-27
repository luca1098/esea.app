import { ActionButtonProps } from '@/kit/Button/ActionButton';

export type CalendarView = 'giorno' | 'settimana' | 'mese' | 'anno';

type ViewButtonProps = {
  value: CalendarView;
} & ActionButtonProps;

export const viewButtons: ViewButtonProps[] = [
  { label: 'Giorno', value: 'giorno' },
  { label: 'Settinama', value: 'settimana' },
  { label: 'Mese', value: 'mese' },
];
