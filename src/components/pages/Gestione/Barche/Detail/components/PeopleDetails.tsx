import { Flex, Icon, Text } from '@chakra-ui/react';
import { PeopleIcon } from '@/kit/Icons/icons';
import { Nullish } from '@/core/types/utils';

type PeopleDetails = {
  maxPeople: Nullish<number>;
};

const PeopleDetails = ({ maxPeople }: PeopleDetails) => {
  return (
    <Flex gap={2} alignItems={'center'}>
      <Icon as={PeopleIcon} />
      <Text>
        Max. persone: <b>{maxPeople ?? '-'}</b>
      </Text>
    </Flex>
  );
};

export default PeopleDetails;
