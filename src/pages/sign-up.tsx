import HeroSection from '@/components/pages/Login/HeroSection';
import LoginBox from '@/components/pages/Login/LoginBox';
import Layout from '@/components/Layout/Layout';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import SignUpForm from '@/components/pages/Login/SignUpForm';

const SignUp = () => {
  return (
    <Layout>
      <HeroSection
        title='Benvenuto'
        subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      />
      <SignUpForm />
    </Layout>
  );
};

export default SignUp;
