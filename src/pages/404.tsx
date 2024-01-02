import Layout from '@/components/Layout/Layout';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import { navigation } from '@/core/config/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotFound = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user.companyId) router.push(navigation.onboard);
  }, [session?.user, router]);

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
