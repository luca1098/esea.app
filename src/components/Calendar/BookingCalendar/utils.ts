import { Event } from '@/core/shared/types/event';
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

export const getDayEvents =
  (day: number, month: number, years: number) => (events: Event[]) => {
    const firteredEvents = events?.filter((e) => {
      const fromDate = new Date(e.from);
      const toDate = new Date(e.to);

      return (
        (fromDate.getFullYear() === years || toDate.getFullYear() === years) &&
        (fromDate.getMonth() === month || toDate.getMonth() === month) &&
        (fromDate.getDate() === day || toDate.getDate() === day)
      );
    });
    return firteredEvents;
  };
