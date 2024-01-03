import PrivateLayout from '@/components/Layout/PrivateLayout';
import { PropsWithUser } from '@/core/types/user';
import React, { PropsWithChildren } from 'react';
import UserPanel from './UserPanel';
import { Box } from '@chakra-ui/react';
import { PropsWithCompany } from '@/core/types/company';

type GestioneLayoutProps = PropsWithUser & PropsWithChildren & PropsWithCompany;
const GestioneLayout = ({ user, company, children }: GestioneLayoutProps) => {
  return (
    <PrivateLayout user={user} company={company}>
      <UserPanel user={user} />
      <Box py={4}>{children}</Box>
    </PrivateLayout>
  );
};

export default GestioneLayout;
