import { PropsWithChildren, createContext } from 'react';
import Header from './Header/Header';
import { PropsWithUser, Role } from '@/core/types/user';
import Sidebar from './Sidebar/Sidebar';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import Footer from './Footer/Footer';
import { menuByUserRole } from '@/core/config/menu';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { CompanyProps } from '@/core/types/company';

type PrivateLayoutProps = {
  company?: CompanyProps;
  isCompanyLoading?: boolean;
} & PropsWithChildren &
  PropsWithUser;

type SidebarContextProps = {
  isMobileOpen: boolean;
  isExpanded: boolean;
  onMobileClose: () => void;
  onMobileOpen: () => void;
  onExpandedToggle: () => void;
  onExpandedOpen: () => void;
};

export const SidebarContext = createContext<SidebarContextProps>({
  isMobileOpen: false,
  isExpanded: true,
  onMobileClose: () => null,
  onMobileOpen: () => null,
  onExpandedToggle: () => null,
  onExpandedOpen: () => null,
});

const PrivateLayout = ({ children, user, company }: PrivateLayoutProps) => {
  const {
    isOpen: isMobileOpen,
    onClose: onMobileClose,
    onOpen: onMobileOpen,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const {
    isOpen: isExpanded,
    onToggle: onExpandedToggle,
    onOpen: onExpandedOpen,
  } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <>
      <SidebarContext.Provider
        value={{
          isMobileOpen,
          isExpanded,
          onMobileClose,
          onMobileOpen,
          onExpandedOpen,
          onExpandedToggle,
        }}
      >
        <Flex bg={'esea.gray'}>
          <Sidebar
            menu={menuByUserRole[(user?.role ?? 'OWNER') as Role]}
            company={company}
            isLoading={false}
          />
          <Box w={'full'}>
            <Header user={user} />

            <Box px={4}>
              <Breadcrumb />
              {children}
            </Box>
          </Box>
        </Flex>
      </SidebarContext.Provider>
      <Footer />
    </>
  );
};

export default PrivateLayout;
