import { format } from 'date-fns';
import { getLocaleConfig } from './localeConfig';
import { Nullish } from '../types/utils';

export const formatTime = (timestamp: Nullish<number>) => {
  if (typeof timestamp !== 'number') return '';
  return format(new Date(timestamp), getLocaleConfig().timeFormat);
};
export const formatDate = (timestamp: Nullish<number>) => {
  if (typeof timestamp !== 'number') return '';
  return format(new Date(timestamp), getLocaleConfig().dateFormat);
};
export const dateToTimestamp = (date: Nullish<Date>) => {
  if (!date || typeof date !== 'object') return '';
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
