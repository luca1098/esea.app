import { formatCurrency } from '@/core/utils/currencies';
import { formatDate } from '@/core/utils/date';
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { personaleRoleMapper, salaryMapper } from '../config';
import { PersonaleProps } from '@/core/types/personale';
import { TrashIcon } from '@/kit/Icons/icons';

type CardPersonaleProps = {
  person: PersonaleProps;
  onDelete: (id: string) => void;
};

const CardPersonale = ({ person, onDelete }: CardPersonaleProps) => {
  return (
    <Stack alignItems={'center'} borderWidth={1} rounded={'2xl'} p={6}>
      <Avatar src={person.image ?? ''} name={person.name} size={'lg'} mb={2} />
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
          {`/ ${salaryMapper[person.salaryType ?? 'DAY'].label}`}
        </Text>
      </Text>
      <Stack>
        <IconButton
          icon={<TrashIcon />}
          onClick={() => onDelete(person.id)}
          aria-label={`Rimuovi ${person.name} dal personale`}
          variant={'action'}
        />
      </Stack>
    </Stack>
  );
};

export default CardPersonale;
