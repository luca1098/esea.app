import { Box, BoxProps } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

type ContentBoxProps = Omit<BoxProps, 'bg' | 'backgroundColor'> &
  PropsWithChildren;

const ContentBox = ({ children, ...props }: ContentBoxProps) => {
  return (
    <Box p={6} rounded={'2xl'} bg={'white'} {...props}>
      {children}
    </Box>
  );
};

export default ContentBox;
