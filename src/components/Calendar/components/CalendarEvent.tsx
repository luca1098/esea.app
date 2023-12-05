import { Event } from '@/core/shared/types/event';
import { formatTime } from '@/core/shared/utils/date';
import Button from '@/kit/Button/Button';
import {
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const bgColors = [
  'red.100',
  'red.200',
  'orange.100',
  'orange.200',
  'yellow.100',
  'yellow.200',
  'green.100',
  'green.200',
  'teal.100',
  'teal.200',
  'blue.100',
  'blue.200',
  'cyan.100',
  'cyan.200',
  'purple.100',
  'purple.200',
  'pink.100',
  'pink.200',
];

const CalendarEvent = ({ id, from, to, titolo }: Event) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box
          key={id}
          bg={'orange.100'}
          rounded={'sm'}
          px={0.5}
          cursor={'pointer'}
        >
          <Text fontSize={'xs'} fontWeight={'bold'}>
            {titolo}
          </Text>
          <Text fontSize={'xs'}>
            {formatTime(from)} - {formatTime(to)}
          </Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent p={6}>
        <Stack gap={2}>
          <Box>
            <Text fontWeight={700}>{titolo}</Text>
            <Text fontSize={'sm'}>
              {formatTime(from)} - {formatTime(to)}
            </Text>
          </Box>
          <Button label='Vai alla prenotazione' />
        </Stack>
      </PopoverContent>
    </Popover>
  );
};

export default CalendarEvent;
