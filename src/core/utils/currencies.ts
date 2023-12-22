import _, { isNil } from 'lodash';
import { defaultLocale } from './localeConfig';
import { Nullish } from '../types/utils';

const formatNumber = (
  value: string | number,
  options?: Intl.NumberFormatOptions,
) => {
  if (
    (typeof value === 'number' || typeof value === 'string') &&
    _.isFinite(Number(value))
  ) {
    return Intl.NumberFormat(defaultLocale, options).format(Number(value));
  }
  return '';
};

export const formatCurrency = (
  value: Nullish<string | number>,
  currency: string | undefined = 'EUR',
  options?: Intl.NumberFormatOptions,
) => {
  if (isNil(value)) return null;
  const config = {
    ...(currency && { style: 'currency', currency }),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  } as Intl.NumberFormatOptions;
  return formatNumber(value, config);
};
