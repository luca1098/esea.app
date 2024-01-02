import { format, isValid, isWithinInterval } from 'date-fns';
import { getLocaleConfig } from './localeConfig';
import { Nullish } from '../types/utils';
import { EventProps } from '../types/event';

export const formatTimeFromTimestamp = (timestamp: Nullish<number>) => {
  if (typeof timestamp !== 'number') return '';
  return format(new Date(timestamp), getLocaleConfig().timeFormat);
};

export const formatDate = (date: Nullish<number | string>) => {
  if (date && isValid(new Date(date))) {
    return format(new Date(date), getLocaleConfig().dateFormat);
  }
  return '';
};

export const formatDateTimeFromTimestamp = (timestamp: Nullish<number>) => {
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
