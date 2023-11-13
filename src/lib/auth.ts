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
import { userQuery } from './graphql/queries/user';
import { authPage } from 'src/config/authpage';

export const config = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // tempo di scadenza 30 gg
  },
  pages: authPage,
  callbacks: {
    async jwt({ token, user }) {
      if (user)
        return {
          ...token,
          role: user.role,
          id: user.id,
        };
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
          query: userQuery,
          variables: {
            email: credentials?.email,
          },
        });

        if (error) return null;

        if (!data.user) return null;

        if (data.user) {
          const { password } = data.user;
          if (password === credentials.password)
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              image: data.user.image,
              role: data.user.role,
            };
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
