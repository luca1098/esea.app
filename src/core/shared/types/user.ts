import { Session } from 'next-auth';

export type Role = 'ADMIN' | 'USER';

export type PropsWithUser = {
  user?: Session['user'];
};
