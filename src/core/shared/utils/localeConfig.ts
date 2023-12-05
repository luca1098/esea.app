import it from 'date-fns/locale/it';

export const defaultLocale = 'it-IT';

export const LocaleConfig = {
  'it-IT': {
    locale: it,
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'HH:mm',
    timeSecFormat: 'HH:mm:ss',
    dateTimeFormat: 'dd/MM/yyyy, HH:mm',
    dateTimeSecFormat: 'dd/MM/yyyy, HH:mm:ss',
    datePlaceholder: 'Seleziona data',
  },
} as const;

export const getLocaleConfig = () => {
  return LocaleConfig[defaultLocale];
};
