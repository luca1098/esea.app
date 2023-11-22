import { Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';
import SigninButton from './components/SigninButton';
import { PropsWithUser } from '@/core/shared/types/user';
import SettingsMenu from '../Sidebar/components/SettingsMenu';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';

type HeaderProps = {} & PropsWithUser;

const Header = ({ user }: HeaderProps) => {
  return (
    <Box as={'header'} py={2} px={4}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Breadcrumb />
        {user ? <SettingsMenu user={user} /> : <SigninButton />}
      </Flex>
    </Box>
  );
};

export default Header;
