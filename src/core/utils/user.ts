import { Session } from 'next-auth';

export const getIsAdmin = (user: Session['user']) => {
  return user.role === 'ADMIN';
};
