import { format } from 'date-fns';
import { getLocaleConfig } from './localeConfig';
import { Nullish } from '../types/utils';

export const formatTime = (timestamp: Nullish<number>) => {
  if (typeof timestamp !== 'number') return '';
  return format(new Date(timestamp), getLocaleConfig().timeFormat);
};
