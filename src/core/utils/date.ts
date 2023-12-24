import { format, isWithinInterval } from 'date-fns';
import { getLocaleConfig } from './localeConfig';
import { Nullish } from '../types/utils';
import { EventProps } from '../types/event';

export const formatTime = (timestamp: Nullish<number>) => {
  if (typeof timestamp !== 'number') return '';
  return format(new Date(timestamp), getLocaleConfig().timeFormat);
};

export const formatDate = (timestamp: Nullish<number>) => {
  if (typeof timestamp !== 'number') return '';
  return format(new Date(timestamp), getLocaleConfig().dateFormat);
};

export const formatDateTime = (timestamp: Nullish<number>) => {
  if (typeof timestamp !== 'number') return '';
  return format(new Date(timestamp), getLocaleConfig().dateTimeFormat);
};

export const dateToTimestamp = (date: Nullish<Date>) => {
  if (!date || typeof date !== 'object') return null;
  return Math.floor(date.getTime());
};

export const filterTimeByHours = (
  time: Date,
  rangeFrom: number,
  rangeTo?: number,
) => {
  const selectedDate = new Date(time);
  return (
    selectedDate.getHours() >= rangeFrom &&
    (rangeTo ? selectedDate.getHours() <= rangeTo : true)
  );
};
export const filterTimeByHoursAndEvent =
  (time: Date) => (events: EventProps[]) => {
    const intervalValid = !events.some((e) =>
      isWithinInterval(time, { start: e.from, end: e.to }),
    );
    return intervalValid;
  };
