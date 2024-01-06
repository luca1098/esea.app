import PrivateLayout from '@/components/Layout/PrivateLayout';
import { PropsWithUser } from '@/core/types/user';
import React, { PropsWithChildren } from 'react';
import UserPanel from './UserPanel';
import { Box } from '@chakra-ui/react';
import { PropsWithCompany } from '@/core/types/company';

type GestioneLayoutProps = { isCompanyLoading?: boolean } & PropsWithUser &
  PropsWithChildren &
  PropsWithCompany;
const GestioneLayout = ({
  user,
  company,
  isCompanyLoading,
  children,
}: GestioneLayoutProps) => {
  return (
    <PrivateLayout
      user={user}
      company={company}
      isCompanyLoading={isCompanyLoading}
    >
      <UserPanel user={user} />
      <Box py={4}>{children}</Box>
    </PrivateLayout>
  );
};

export default GestioneLayout;
