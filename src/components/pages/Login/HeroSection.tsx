import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import COVER from '@/assets/bg.png';

type HeroSectionProps = {
  title?: string;
  subtitle?: string;
};

const HeroSection = ({ title, subtitle }: HeroSectionProps) => {
  return (
    <Stack
      as='section'
      height={'300px'}
      rounded={'lg'}
      overflow={'hidden'}
      position={'relative'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Image src={COVER} alt='' fill style={{ objectFit: 'cover' }} />
      <Heading position={'relative'} zIndex={3} textAlign={'center'}>
        {title}
      </Heading>
      <Text zIndex={3}>{subtitle}</Text>
    </Stack>
  );
};

export default HeroSection;
