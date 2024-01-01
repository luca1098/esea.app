import { Session } from 'next-auth';
import { PlanProps } from './plan';
import { PaymentProps } from './payments';

export type Role = 'ADMIN' | 'OWNER';

export type PropsWithUser = {
  user?: Session['user'];
};

export type UserExtended = {
  cellulare?: string;
  payment?: PaymentProps;
  plan?: PlanProps;
  dataNascita?: number;
  codFisc?: string;
  birthday?: number;
} & Session['user'];

export type PropsWithUserExtended = {
  user?: UserExtended;
};
