import { ServiceProps } from '../types/services';

export const DEFAULT_SERVICES: ServiceProps[] = [
  {
    id: 'service-locazione',
    label: 'Locazione',
    durations: [
      {
        label: 'Intera giornata',
        price: 0,
      },
    ],
  },
  {
    id: 'service-noleggio',
    label: 'Noleggio',
    durations: [
      {
        label: 'Intera giornata',
        price: 0,
      },
    ],
  },
];
