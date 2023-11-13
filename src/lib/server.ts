import { isDev } from './utils';

const baseUrl = isDev ? 'http://localhost:3000' : process.env.BASE_URL;

export const graphqlServer = `${baseUrl}/api/graphql`;
