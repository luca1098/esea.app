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
import { ellipsText } from '@/core/shared/utils/normalize';

const bgColors = [
  'red.100',
  'orange.100',
  'yellow.100',
  'green.100',
  'teal.100',
  'blue.100',
  'cyan.100',
  'purple.100',
  'pink.100',
];

type CalendarEventProps = {
  index: number;
} & Event;

const CalendarEvent = ({ id, from, to, titolo, index }: CalendarEventProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box
          key={id}
          bg={bgColors[index] || 'orange.100'}
          rounded={'sm'}
          px={0.5}
          cursor={'pointer'}
        >
          <Text fontSize={'xs'} fontWeight={'bold'}>
            {`${ellipsText(titolo, 5)} ${formatTime(from)} - ${formatTime(to)}`}
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
