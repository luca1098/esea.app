import { PropsWithUser } from '@/core/shared/types/user';
import { Box, Container } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import HeaderLanding from './Header/HeaderLanding';

type LayoutLandingProps = {} & PropsWithChildren & PropsWithUser;

const LayoutLanding = ({ children, user }: LayoutLandingProps) => {
  return (
    <Box bgColor={'gray.50'} minH={'100vh'}>
      <HeaderLanding user={user} />
      <Container>{children}</Container>
    </Box>
  );
};

export default LayoutLanding;
