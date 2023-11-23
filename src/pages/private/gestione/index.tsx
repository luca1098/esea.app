import React from 'react';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';

const user = {
  name: 'Test',
  email: 'test@email.it',
  image: '',
  role: 'OWNER',
  id: '#id',
};
const Gestione = () => {
  return <GestioneLayout user={user}>Overview</GestioneLayout>;
};

export default Gestione;
