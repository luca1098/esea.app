import Layout from '@/components/Layout/Layout';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import { useSession } from 'next-auth/react';
import React from 'react';

const NotFound = () => {
  const { data: session } = useSession();
  if (session?.user)
    return (
      <PrivateLayout user={session?.user}>
        <div>NotFound</div>
      </PrivateLayout>
    );
  return (
    <Layout user={session?.user}>
      <div>NotFound</div>
    </Layout>
  );
};

export default NotFound;
