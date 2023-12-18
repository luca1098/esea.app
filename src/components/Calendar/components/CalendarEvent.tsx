import { EventProps } from '@/core/types/event';
import { formatTime } from '@/core/utils/date';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { ellipsText } from '@/core/utils/normalize';

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
  serviceSlug,
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
          <RestrictedEvent titolo={serviceSlug} from={from} to={to} />
        ) : (
          <Event titolo={serviceSlug} from={from} to={to} />
        )}
      </Text>
    </Box>
  );
};

export default CalendarEvent;

type EventComponentProps = {
  titolo: string;
} & Pick<EventProps, 'from' | 'to'>;

const RestrictedEvent = ({ titolo, from, to }: EventComponentProps) => (
  <Text fontSize={'xs'} fontWeight={'bold'}>
    {`${ellipsText(titolo, 5)} ${formatTime(from)} - ${formatTime(to)}`}
  </Text>
);
const Event = ({ titolo, from, to }: EventComponentProps) => (
  <>
    <Text fontSize={'xs'} fontWeight={'bold'}>
      {titolo}
    </Text>
    <Text>
      {formatTime(from)} - {formatTime(to)}`
    </Text>
  </>
);
