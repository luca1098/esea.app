import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'src/core/theme';
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'src/lib/apollo';
import { SessionProvider } from 'next-auth/react';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import itTranslation from 'zod-i18n-map/locales/it/zod.json';
import i18next from 'i18next';

i18next.init({
  lng: 'it',
  resources: {
    it: { zod: itTranslation },
  },
});
z.setErrorMap(zodI18nMap);

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
