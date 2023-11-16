import React from 'react';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import Image from '@/components/Image/Image';
import { signOut } from 'next-auth/react';
import PROFILE_PLACEHOLDER from '@/assets/profile-placeholder.jpg';
import { PropsWithUser } from '@/core/shared/types/user';

type SettingsMenuProps = {} & PropsWithUser;

const SettingsMenu = ({ user }: SettingsMenuProps) => {
  return (
    <Menu>
      <MenuButton as={Button}>
        <Flex alignItems={'center'} gap={2}>
          <Image
            src={user?.image ?? PROFILE_PLACEHOLDER}
            alt='Profilo'
            w={8}
            h={8}
            rounded={'full'}
          />
          <Text>{user?.name ?? 'Profilo'}</Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>Gestione</MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => signOut()}>Esci</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SettingsMenu;
