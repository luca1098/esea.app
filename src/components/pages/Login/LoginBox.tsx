import { Box, Heading } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type LoginBoxTitle = { title?: string } & PropsWithChildren;
const LoginBox = ({ children, title }: LoginBoxTitle) => {
  return (
    <Box
      maxW={500}
      mx={'auto'}
      mt={-8}
      bg={'white'}
      borderWidth={1}
      borderColor={'gray.200'}
      py={4}
      px={8}
      rounded={'2xl'}
      position={'relative'}
      zIndex={2}
      boxShadow={'menu.item'}
    >
      {title ? (
        <Heading textAlign={'center'} fontSize={'3xl'} pb={6}>
          {title}
        </Heading>
      ) : null}
      {children}
    </Box>
  );
};

export default LoginBox;
