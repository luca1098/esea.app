import { PropsWithUser } from '@/core/types/user';
import Button from '@/kit/Button/Button';
import {
  Box,
  Container,
  Flex,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { publicMenu } from '@/core/config/menu';
import Logo from '../components/Logo';

type HeaderLandingProps = {} & PropsWithUser;

const HeaderLanding = ({ user }: HeaderLandingProps) => {
  return (
    <Box as={'header'} p={2} position={'fixed'} zIndex={'sticky'} w={'full'}>
      <Container
        size={'sm'}
        as={'nav'}
        py={4}
        borderWidth={1}
        borderColor={'esea.gray'}
        boxShadow={'menu.item'}
        borderRadius={'2xl'}
        bg={'rgba(255,255,255, .6)'}
        backdropFilter='auto'
        backdropBlur='40px'
      >
        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box flex={1}>
            <Logo />
          </Box>
          <Navbar menu={publicMenu} user={user} />
        </Flex>
      </Container>
    </Box>
  );
};

export default HeaderLanding;
