import it from 'date-fns/locale/it';
import en from 'date-fns/locale/en-US';
import { LocalesProps } from '../types/locale';

export const defaultLocale = 'it';

export const LocaleConfig = {
  it: {
    locale: it,
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'HH:mm',
    timeSecFormat: 'HH:mm:ss',
    dateTimeFormat: 'dd/MM/yyyy, HH:mm',
    dateTimeSecFormat: 'dd/MM/yyyy, HH:mm:ss',
    datePlaceholder: 'Seleziona data',
  },
  en: {
    locale: en,
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'HH:mm',
    timeSecFormat: 'HH:mm:ss',
    dateTimeFormat: 'dd/MM/yyyy, HH:mm',
    dateTimeSecFormat: 'dd/MM/yyyy, HH:mm:ss',
    datePlaceholder: 'Seleziona data',
  },
} as const;

export const getLocaleConfig = (locale: LocalesProps = defaultLocale) => {
  return LocaleConfig[locale];
};

export const registerDataPickerConfig = {
  it,
  en,
};
