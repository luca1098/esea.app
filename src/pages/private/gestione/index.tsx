import React from 'react';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import { GetSessionParams, getSession, useSession } from 'next-auth/react';

const user = {
  name: 'Test',
  email: 'test@email.it',
  image: '',
  role: 'OWNER',
  id: '#id',
};
const Gestione = () => {
  const { data } = useSession();
  return <GestioneLayout user={data?.user}>Overview</GestioneLayout>;
};

export default Gestione;
