import Image from 'next/image';
import { formatCurrency } from '@/core/shared/utils/currencies';
import { formatDate } from '@/core/shared/utils/date';
import { Badge, Box, Divider, Stack, Text } from '@chakra-ui/react';
import { personaleRoleMapper, salaryMapper } from '../config';
import PROFILE_PLACEHOLDER from '@/assets/profile-placeholder.jpg';
import { PersonaleProps } from './schemas';

type CardPersonaleProps = {
  person: PersonaleProps;
};

const CardPersonale = ({ person }: CardPersonaleProps) => {
  return (
    <Stack alignItems={'center'} borderWidth={1} rounded={'2xl'} p={6}>
      <Box
        width={20}
        height={20}
        overflow={'hidden'}
        position={'relative'}
        rounded={'full'}
      >
        <Image
          src={person.image || PROFILE_PLACEHOLDER}
          alt={`${person.name} profilo`}
          style={{ objectFit: 'cover' }}
          fill
        />
      </Box>
      <Badge colorScheme={personaleRoleMapper[person.role]?.color}>
        {personaleRoleMapper[person.role]?.label}
      </Badge>
      <Text textAlign={'center'} fontWeight={'bold'}>
        {person.name}
      </Text>
      <Text textAlign={'center'} fontSize={'small'}>
        {formatDate(person.birthday)}
      </Text>
      <Divider />
      <Text textAlign={'center'} fontWeight={'medium'}>
        {formatCurrency(person.salary)}
        <Text ml={1} as={'small'} fontWeight={'normal'}>
          {`/ ${salaryMapper[person.salaryType].label}`}
        </Text>
      </Text>
    </Stack>
  );
};

export default CardPersonale;
