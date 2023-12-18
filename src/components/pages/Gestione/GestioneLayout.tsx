import PrivateLayout from '@/components/Layout/PrivateLayout';
import { PropsWithUser } from '@/core/types/user';
import React, { PropsWithChildren } from 'react';
import UserPanel from './UserPanel';
import { Box } from '@chakra-ui/react';

type GestioneLayoutProps = PropsWithUser & PropsWithChildren;
const GestioneLayout = ({ user, children }: GestioneLayoutProps) => {
  return (
    <PrivateLayout user={user}>
      <UserPanel user={user} />
      <Box py={4}>{children}</Box>
    </PrivateLayout>
  );
};

export default GestioneLayout;
