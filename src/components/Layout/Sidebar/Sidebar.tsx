import { CloseButton, Heading, Stack, useMediaQuery } from '@chakra-ui/react';
import React, { useContext } from 'react';
import NavigationMenu from './components/NavigationMenu';
import { MenuItemProps } from '@/core/config/menu';
import ExpandButton from './components/ExpandButton';
import CompanyBox from './components/CompanyBox';
import { SidebarContext } from '../PrivateLayout';
import { breakpoint } from '@/core/theme/utils';
import { scrollToTop } from '@/core/utils/helpers';
import { CompanyProps } from '@/core/types/company';

type SidebarProps = {
  menu: MenuItemProps[];
  company?: CompanyProps;
};
const Sidebar = ({ menu, company }: SidebarProps) => {
  const { isMobileOpen, isExpanded, onMobileClose, onExpandedToggle } =
    useContext(SidebarContext);

  const [isMobile] = useMediaQuery(`(max-width: ${breakpoint.lg})`);

  const espanded = isMobile || isExpanded;
  return (
    <>
      <Stack
        as='aside'
        w={{
          base: '100%',
          lg: isExpanded ? '30%' : 'auto',
        }}
        overflow={{ base: 'hidden', lg: 'visible' }}
        bg={'esea.primary'}
        h={{ base: '100%', lg: '100vh' }}
        maxW={{ lg: '350px' }}
        position={{ base: 'fixed', lg: 'sticky' }}
        top={0}
        left={isMobileOpen ? 0 : '-100%'}
        padding={{ base: isMobileOpen ? 8 : 0, lg: 8 }}
        spacing={8}
        zIndex={'sticky'}
        transition={'all .2s ease-in-out'}
      >
        <ExpandButton
          onClick={onExpandedToggle}
          isExpanded={espanded}
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
        <Heading color={'white'}>{espanded ? 'Esea.app' : 'E'}</Heading>
        <CompanyBox isExpandend={espanded} company={company} />
        <NavigationMenu
          menu={menu}
          isMenuExpanded={espanded}
          closeSidebar={
            isMobile
              ? () => {
                  onMobileClose();
                  scrollToTop();
                }
              : () => null
          }
        />
      </Stack>
    </>
  );
};

export default Sidebar;
