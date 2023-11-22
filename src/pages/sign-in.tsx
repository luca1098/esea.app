import Layout from '@/components/Layout/Layout';
import { GetSessionParams, getSession } from 'next-auth/react';
import React from 'react';
import HeroSection from '@/components/pages/Login/HeroSection';
import SignInForm from '@/components/pages/Login/SignInForm';

const SignIn = () => {
  return (
    <Layout>
      <HeroSection
        title='Bentornato'
        subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      />
      <SignInForm />
    </Layout>
  );
};

export default SignIn;

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/private/dashboard',
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
