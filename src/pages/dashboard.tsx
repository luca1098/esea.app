import { userQuery } from 'src/lib/graphql/queries/user';
import apolloClient from 'src/lib/apollo';
import { auth } from 'src/lib/auth';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session } = useSession();
  console.log({ session });
  return (
    <Stack spacing={2}>
      <Heading textAlign={'center'}>Welcome, {session?.user?.name}</Heading>
      <Box>
        <Button
          mx={'auto'}
          onClick={() => signOut()}
          variant={'solid'}
          display={'block'}
        >
          Log out
        </Button>
      </Box>
    </Stack>
  );
};

export default Dashboard;

// export async function getServerSideProps(context) {
//  const { data: session, status } = useSession()
//   console.log('####', { session });

//   return {
//     props: {
//       session,
//     },
//   };
// }
export const getStaticProps = async () => {
  return {
    props: {
      users: [],
    },
  };
};
