import { MenuItemProps } from '@/core/config/menu';
import { PropsWithUser } from '@/core/types/user';
import Button from '@/kit/Button/Button';
import { Box, Flex, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';

type NavbarProps = {
  menu: MenuItemProps[];
} & PropsWithUser;

const Navbar = ({ user, menu }: NavbarProps) => {
  return (
    <Box as='nav' flex={2}>
      <UnorderedList
        display={'flex'}
        gap={4}
        listStyleType={'none'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flex={1}
      >
        <Flex gap={4}>
          {menu?.map((i) => <ListItem key={i.id}>{i.label}</ListItem>)}
        </Flex>
        <ListItem>
          <Button
            label={user ? 'Dashboard' : 'Login'}
            href={user ? '/private/dashboard' : '/sign-in'} // TOOD gestire rotta admin
          />
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default Navbar;
