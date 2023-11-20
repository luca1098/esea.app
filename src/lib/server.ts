import { isDev } from './utils';

export const baseUrl = isDev ? 'http://localhost:3000' : process.env.BASE_URL;

export const graphqlServer = `${baseUrl}/api/graphql`;
