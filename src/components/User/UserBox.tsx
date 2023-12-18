import BlurBox from '@/kit/Box/BlurBox';
import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react';
import { PropsWithUser } from '@/core/types/user';
import { ReactNode } from 'react';

type UserBoxProps = {
  endComponent?: ReactNode;
} & PropsWithUser;
const UserBox = ({ user, endComponent }: UserBoxProps) => {
  return (
    <BlurBox
      w={'95%'}
      mx={'auto'}
      mt={-16}
      zIndex={2}
      position={'relative'}
      display='flex'
      flexDir={{ base: 'column', md: 'row' }}
      alignItems={'center'}
      justifyContent={{ base: 'center', md: 'space-between' }}
    >
      <Flex
        gap={4}
        alignItems={'center'}
        direction={{ base: 'column', md: 'row' }}
      >
        <Avatar
          src={user?.image ?? undefined}
          name={user?.name ?? ''}
          size={'xl'}
        />
        <Box textAlign={{ base: 'center', md: 'left' }}>
          <Badge colorScheme='cyan'>{user?.role}</Badge>
          <Text fontSize={'xl'} fontWeight={'bold'} color={'black'}>
            {user?.name}
          </Text>
          <Text fontSize={'lg'} color={'text.gray'}>
            {user?.email}
          </Text>
        </Box>
      </Flex>
      {endComponent ? endComponent : null}
    </BlurBox>
  );
};

export default UserBox;
