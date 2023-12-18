import { Session } from 'next-auth';

export type Role = 'ADMIN' | 'OWNER';

export type PropsWithUser = {
  user?: Session['user'];
};
export type UserExtended = {
  cellulare?: string;
  paymentMethod: 'CARD' | 'PAYPAL';
  plan: 'VIP' | 'BASIC' | 'SILVER';
  birthday: number;
} & Session['user'];
