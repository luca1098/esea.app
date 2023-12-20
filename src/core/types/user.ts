import { Session } from 'next-auth';
import { PlanProps } from './plan';
import { PaymentProps } from './payments';

export type Role = 'ADMIN' | 'OWNER';

export type PropsWithUser = {
  user?: Session['user'];
};

export type UserExtended = {
  cellulare?: string;
  payment: PaymentProps;
  plan: PlanProps;
  birthday: number;
} & Session['user'];
