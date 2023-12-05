import BlurBox from '@/kit/Box/BlurBox';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import PROFILE_PLACEHOLDER from '@/assets/profile-placeholder.jpg';
import ESImage from '@/kit/Image/Image';
import { PropsWithUser } from '@/core/shared/types/user';
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
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Flex gap={4} alignItems={'center'}>
        <ESImage
          src={user?.image || PROFILE_PLACEHOLDER}
          alt='profilo'
          w={'80px'}
          h={'80px'}
          rounded={'2xl'}
        />
        <Box>
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
