import { PrismaAdapter } from '@auth/prisma-adapter';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import { prisma } from 'prisma/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import apolloClient from './apollo';
import { GET_USER_QUERY } from './graphql/queries/user';
import { authPage } from '@/core/config/authpage';
import bcrypt from 'bcryptjs';

export const config = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // tempo di scadenza 30 gg
  },
  pages: authPage,
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      if (trigger === 'update' && session?.companyId) {
        token.companyId = session.companyId;
      }
      if (trigger === 'update' && session?.personalInfoFlag) {
        token.picture = session.image;
        token.phone = session.phone;
        token.dataNascita = session.dataNascita;
        token.codFisc = session.codFisc;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
            companyId: token.companyId,
            dataNascita: token.dataNascita,
            phone: token.phone,
            codFisc: token.codFisc,
          },
        };
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const { data, error } = await apolloClient.query({
          query: GET_USER_QUERY,
          variables: {
            email: credentials?.email,
          },
        });

        if (error) return null;

        if (!data.user) return null;

        if (data.user) {
          const { password } = data.user;
          const isPwCorrect = await bcrypt.compare(
            credentials.password,
            password,
          );

          if (isPwCorrect) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              image: data.user.image,
              role: data.user.role,
              companyId: data.user.companyId,
              dataNascita: data.user.dataNascita,
              phone: data.user.phone,
              codFisc: data.user.codFisc,
            };
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
