import {
  Box,
  Heading,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import NavigationMenu from './components/NavigationMenu';
import { MenuItemProps } from '@/core/config/menu';
import SettingsMenu from './components/SettingsMenu';
import { PropsWithUser } from '@/core/shared/types/user';
import { DoubleArrowDxIcon } from '@/kit/Icons/icons';
import ExpandButton from './components/ExpandButton';

type SidebarProps = {
  menu: MenuItemProps[];
};
const Sidebar = ({ menu }: SidebarProps) => {
  const { isOpen: isExpanded, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });
  console.log('##', { isExpanded });
  return (
    <Stack
      as='aside'
      w={isExpanded ? '30%' : 'auto'}
      bg={'esea.gray'}
      h={'100vh'}
      maxW={'350px'}
      position={'sticky'}
      top={0}
      left={0}
      padding={4}
      spacing={8}
    >
      <ExpandButton onClick={onToggle} isExpanded={isExpanded} />
      <Heading>{isExpanded ? 'Esea.app' : 'E'}</Heading>
      <NavigationMenu menu={menu} isMenuExpanded={isExpanded} />
    </Stack>
  );
};

export default Sidebar;
