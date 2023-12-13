import { CloseButton, Heading, Stack, useDisclosure } from '@chakra-ui/react';
import React, { useContext } from 'react';
import NavigationMenu from './components/NavigationMenu';
import { MenuItemProps } from '@/core/config/menu';
import ExpandButton from './components/ExpandButton';
import CompanyBox from './components/CompanyBox';
import { SidebarContext } from '../PrivateLayout';

type SidebarProps = {
  menu: MenuItemProps[];
};
const Sidebar = ({ menu }: SidebarProps) => {
  const { isMobileOpen, isExpanded, onMobileClose, onExpandedToggle } =
    useContext(SidebarContext);

  return (
    <>
      <Stack
        as='aside'
        w={{
          base: '100%',
          lg: isExpanded ? '30%' : 'auto',
        }}
        overflow={'hidden'}
        bg={'esea.primary'}
        h={'100vh'}
        maxW={{ lg: '350px' }}
        position={{ base: 'fixed', lg: 'sticky' }}
        top={0}
        left={isMobileOpen ? 0 : '-100%'}
        padding={{ base: isMobileOpen ? 8 : 0, lg: 8 }}
        spacing={8}
        zIndex={10}
        transition={'all .2s ease-in-out'}
      >
        <ExpandButton
          onClick={onExpandedToggle}
          isExpanded={isExpanded}
          hideBelow={'lg'}
        />
        <CloseButton
          onClick={onMobileClose}
          position={'absolute'}
          top={4}
          color={'white'}
          right={4}
          hideFrom={'lg'}
        />
        <Heading color={'white'}>{isExpanded ? 'Esea.app' : 'E'}</Heading>
        <CompanyBox isExpandend={isExpanded} />
        <NavigationMenu menu={menu} isMenuExpanded={isExpanded} />
      </Stack>
    </>
  );
};

export default Sidebar;
