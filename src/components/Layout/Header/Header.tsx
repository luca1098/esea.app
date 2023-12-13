import { Box, Container, Flex, IconButton } from '@chakra-ui/react';
import React, { useContext } from 'react';
import SigninButton from './components/SigninButton';
import { PropsWithUser } from '@/core/shared/types/user';
import SettingsMenu from '../Sidebar/components/SettingsMenu';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { SidebarContext } from '../PrivateLayout';
import { BurgerIcon } from '@/kit/Icons/icons';

type HeaderProps = {} & PropsWithUser;

const Header = ({ user }: HeaderProps) => {
  const { onMobileOpen, onExpandedOpen } = useContext(SidebarContext);

  return (
    <>
      <Box as={'header'} py={2} px={4} boxShadow={'menu.item'} bg={'white'}>
        <Flex
          alignItems={'center'}
          justifyContent={{ base: 'space-between', lg: 'flex-end' }}
        >
          <IconButton
            icon={<BurgerIcon />}
            onClick={() => {
              onExpandedOpen();
              onMobileOpen();
            }}
            aria-label='Open'
            hideFrom={'lg'}
          />
          <Box>{user ? <SettingsMenu user={user} /> : <SigninButton />}</Box>
        </Flex>
      </Box>
      <Breadcrumb />
    </>
  );
};

export default Header;
