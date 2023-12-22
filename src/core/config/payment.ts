import { EventStatusType } from '@prisma/client';

export type PaymentStatus = {
  label: string;
  value: EventStatusType;
};

export const paymentStatus: PaymentStatus[] = [
  { label: 'Pagato', value: 'PAYED' },
  { label: 'Da pagare', value: 'TO_PAY' },
  { label: 'Acconto', value: 'ADVANCE_PAYMENT' },
  { label: 'Nessuno', value: 'NONE' },
];
