import { BoatProps } from '@/core/types/barca';
import { EventProps } from '@/core/types/event';
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
  (day: number, month: number, years: number) =>
  (events: EventProps[], services: BoatProps['services']) => {
    const firteredEvents = events?.filter((e) => {
      const fromDate = new Date(e.from);
      const toDate = new Date(e.to);

      return (
        (fromDate.getFullYear() === years || toDate.getFullYear() === years) &&
        (fromDate.getMonth() === month || toDate.getMonth() === month) &&
        (fromDate.getDate() === day || toDate.getDate() === day)
      );
    });

    const mappedEvents = firteredEvents?.map((b) => {
      const service = services?.find((s) => s.slug === b.serviceSlug);
      return { ...b, titolo: service?.label || b.serviceSlug };
    });
    return mappedEvents?.sort((a, b) => (a.from > b.from ? 1 : 0));
  };
