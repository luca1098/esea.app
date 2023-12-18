import Image from 'next/image';
import UserBox from '@/components/User/UserBox';
import { PropsWithUser } from '@/core/types/user';
import { Box, Container } from '@chakra-ui/react';
import PROFILE_BG from '@/assets/bg-profile.png';
import UserPannelActions from './UserPannelActions';

const UserPanel = ({ user }: PropsWithUser) => {
  return (
    <section>
      <Box position={'relative'} minH={300} overflow={'hidden'} rounded={'2xl'}>
        <Image src={PROFILE_BG} alt='' fill style={{ objectFit: 'cover' }} />
      </Box>
      <UserBox user={user} endComponent={<UserPannelActions />} />
    </section>
  );
};

export default UserPanel;
