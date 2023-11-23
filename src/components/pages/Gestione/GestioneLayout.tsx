import PrivateLayout from '@/components/Layout/PrivateLayout';
import { PropsWithUser } from '@/core/shared/types/user';
import React, { PropsWithChildren } from 'react';
import UserPanel from './UserPanel';

type GestioneLayoutProps = PropsWithUser & PropsWithChildren;
const GestioneLayout = ({ user, children }: GestioneLayoutProps) => {
  return (
    <PrivateLayout>
      <UserPanel user={user} />
      {children}
    </PrivateLayout>
  );
};

export default GestioneLayout;
