import { PropsWithUser } from '@/core/shared/types/user';
import Button from '@/kit/Button/Button';
import {
  Box,
  Container,
  Flex,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';

type HeaderLandingProps = {} & PropsWithUser;

const HeaderLanding = ({ user }: HeaderLandingProps) => {
  return (
    <Box as={'header'} borderWidth={1} py={4}>
      <nav>
        <Container>
          <Flex direction={'row'} justifyContent={'space-between'}>
            <p>Logo</p>
            <UnorderedList
              display={'flex'}
              gap={2}
              listStyleType={'none'}
              alignItems={'center'}
            >
              <ListItem>Pricing</ListItem>
              <ListItem>
                <Button
                  label={user ? 'Dashboard' : 'Login'}
                  href={user ? '/private/dashboard' : '/sign-in'}
                />
              </ListItem>
            </UnorderedList>
          </Flex>
        </Container>
      </nav>
    </Box>
  );
};

export default HeaderLanding;
