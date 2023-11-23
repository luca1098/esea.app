import { ActionButton } from '@/kit/Button/ActionButton';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { userPannelActions } from './config';
import { useRouter } from 'next/router';
import { navigation } from '@/core/config/navigation';

const UserPannelActions = () => {
  const { asPath } = useRouter();
  const [path] = asPath.split('?');
  return (
    <Flex gap={2}>
      {userPannelActions.map((a, i) => (
        <>
          {console.log('##', { a })}
          <ActionButton key={i} {...a} isActive={path === a.href} />
        </>
      ))}
    </Flex>
  );
};

export default UserPannelActions;
