import { PropsWithUser } from '@/core/shared/types/user';
import { Container } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import HeaderLanding from './Header/HeaderLanding';

type LayoutLandingProps = {} & PropsWithChildren & PropsWithUser;

const LayoutLanding = ({ children, user }: LayoutLandingProps) => {
  return (
    <>
      <HeaderLanding user={user} />
      <Container>{children}</Container>
    </>
  );
};

export default LayoutLanding;
