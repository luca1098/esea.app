export { default } from 'next-auth/middleware';

// TODO redirect admin user to dashboard admin

export const config = { matcher: ['/private(.*)', '/admin(.*)'] };
