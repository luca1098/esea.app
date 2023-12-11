import { Heading, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import NavigationMenu from './components/NavigationMenu';
import { MenuItemProps } from '@/core/config/menu';
import ExpandButton from './components/ExpandButton';
import CompanyBox from './components/CompanyBox';

type SidebarProps = {
  menu: MenuItemProps[];
};
const Sidebar = ({ menu }: SidebarProps) => {
  const { isOpen: isExpanded, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });
  return (
    <Stack
      as='aside'
      w={isExpanded ? '30%' : 'auto'}
      bg={'esea.primary'}
      h={'100vh'}
      maxW={'350px'}
      position={'sticky'}
      top={0}
      left={0}
      padding={4}
      spacing={8}
    >
      <ExpandButton onClick={onToggle} isExpanded={isExpanded} />
      <Heading color={'white'}>{isExpanded ? 'Esea.app' : 'E'}</Heading>
      <CompanyBox isExpandend={isExpanded} />
      <NavigationMenu menu={menu} isMenuExpanded={isExpanded} />
    </Stack>
  );
};

export default Sidebar;
