import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: number | string;
      role?: string;
      companyId?: string;
      phone?: string;
      dataNascita?: string;
      codFisc?: string;
    } & DefaultSession['user'];
  }
  interface User {
    role?: string;
    companyId?: string;
    phone?: string;
    dataNascita?: string;
    codFisc?: string;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    id?: number | string;
    role?: string;
    companyId?: string;
    phone?: string;
    dataNascita?: string;
    codFisc?: string;
  }
}
