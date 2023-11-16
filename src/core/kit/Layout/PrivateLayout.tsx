import { PropsWithChildren } from 'react';
import Header from './Header/Header';
import { PropsWithUser, Role } from '@/core/shared/types/user';
import Sidebar from './Sidebar/Sidebar';
import { Box, Flex } from '@chakra-ui/react';
import Footer from './Footer/Footer';
import { menuByUserRole } from '@/core/config/menu';

type PrivateLayoutProps = PropsWithChildren & PropsWithUser;

const PrivateLayout = ({ children, user }: PrivateLayoutProps) => {
  console.log('####', { role: user?.role });
  return (
    <>
      <Flex>
        <Sidebar menu={menuByUserRole[(user?.role ?? 'USER') as Role]} />
        <Box w={'full'}>
          <Header user={user} />
          <Box px={4}>{children}</Box>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default PrivateLayout;
