import { PaymentMethodsType } from '@/core/types/payments';

type PaymentConfigProps = {
  label: string;
};
export const paymentMethodConfig: Record<
  PaymentMethodsType,
  PaymentConfigProps
> = {
  CARD: {
    label: 'Carta di credito/debito',
  },
  BITCOIN: {
    label: 'Bitcoin',
  },
  SATISPAY: {
    label: 'Satispay',
  },
  PAYPAL: {
    label: 'Paypal',
  },
  NONE: {
    label: 'Nessuno',
  },
};
