import { Event as EventProps } from '@/core/shared/types/event';
import { formatTime } from '@/core/shared/utils/date';
import { Box, Text } from '@chakra-ui/react';
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
  restricted?: boolean;
} & EventProps;

const CalendarEvent = ({
  id,
  from,
  to,
  titolo,
  index,
  restricted,
}: CalendarEventProps) => {
  return (
    <Box
      key={id}
      bg={bgColors[index] || 'orange.100'}
      rounded={'sm'}
      px={0.5}
      cursor={'pointer'}
    >
      <Text fontSize={'xs'} fontWeight={'bold'}>
        {restricted ? (
          <RestrictedEvent titolo={titolo} from={from} to={to} />
        ) : (
          <Event titolo={titolo} from={from} to={to} />
        )}
      </Text>
    </Box>
  );
};

export default CalendarEvent;

const RestrictedEvent = ({
  titolo,
  from,
  to,
}: Pick<EventProps, 'titolo' | 'from' | 'to'>) => (
  <Text fontSize={'xs'} fontWeight={'bold'}>
    {`${ellipsText(titolo, 5)} ${formatTime(from)} - ${formatTime(to)}`}
  </Text>
);
const Event = ({
  titolo,
  from,
  to,
}: Pick<EventProps, 'titolo' | 'from' | 'to'>) => (
  <>
    <Text fontSize={'xs'} fontWeight={'bold'}>
      {titolo}
    </Text>
    <Text>
      {formatTime(from)} - {formatTime(to)}`
    </Text>
  </>
);
