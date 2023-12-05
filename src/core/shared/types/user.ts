import { Session } from 'next-auth';

export type Role = 'ADMIN' | 'OWNER';

export type PropsWithUser = {
  user?: Session['user'];
};
