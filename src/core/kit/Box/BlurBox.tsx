import { Box, BoxProps } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

type BlurBoxProps = Omit<
  BoxProps,
  'backdropFilte' | 'backdropBlur' | 'bg' | 'backgroundColor'
> &
  PropsWithChildren;

const BlurBox = ({ children, ...props }: BlurBoxProps) => {
  return (
    <Box
      p={6}
      rounded={'2xl'}
      bg={'rgba(255,255,255,.5)'}
      borderWidth={'2px'}
      borderColor={'white'}
      backdropFilter='auto'
      backdropBlur='40px'
      {...props}
    >
      {children}
    </Box>
  );
};

export default BlurBox;
