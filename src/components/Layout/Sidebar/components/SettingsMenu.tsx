import React from 'react';
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { PropsWithUser } from '@/core/shared/types/user';
import { NotificationIcon } from '@/kit/Icons/icons';

type SettingsMenuProps = {} & PropsWithUser;

const SettingsMenu = ({ user }: SettingsMenuProps) => {
  return (
    <Menu>
      <IconButton
        icon={<NotificationIcon size={20} />}
        aria-label={'Apri il drower delle notifiche'}
        variant={'unstyled'}
        color={'black'}
      />
      <MenuButton as={Button} variant={'unstyled'}>
        <Flex alignItems={'center'} gap={2}>
          <Avatar src={user?.image ?? ''} name={user?.name ?? ''} size={'sm'} />
          <Text fontSize={'sm'}>{user?.name ?? 'Profilo'}</Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>Settings</MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => signOut()}>Esci</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SettingsMenu;
