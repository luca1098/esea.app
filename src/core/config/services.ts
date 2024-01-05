import { ServiceProps } from '../types/services';

export const DEFAULT_SERVICES: ServiceProps[] = [
  {
    id: 'service-locazione',
    label: 'Locazione',
    duration: [
      {
        label: 'Intera giornata',
        price: 0,
      },
    ],
  },
  {
    id: 'service-noleggio',
    label: 'Noleggio',
    duration: [
      {
        label: 'Intera giornata',
        price: 0,
      },
    ],
  },
];
