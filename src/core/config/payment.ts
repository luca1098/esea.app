import { StatusTypeProps } from '../types/event';

export type PaymentStatus = {
  label: string;
  value: StatusTypeProps;
};

export const paymentStatus: PaymentStatus[] = [
  { label: 'Pagato', value: 'PAYED' },
  { label: 'Da pagare', value: 'TO_PAY' },
  { label: 'Acconto', value: 'ADVANCE_PAYMENT' },
  { label: 'Nessuno', value: 'NONE' },
];
