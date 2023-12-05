import { Event } from '@/core/shared/types/event';
import { formatTime } from '@/core/shared/utils/date';
import { Box, Text } from '@chakra-ui/react';
import CalendarEvent from '../../components/CalendarEvent';

type CalendarCellProps = {
  day: number;
  isCurrent: boolean;
  events: Event[];
};
const CalendarCell = ({ day, isCurrent, events }: CalendarCellProps) => {
  const getBgColor = () => {
    if (isCurrent) return 'gray.50';
    return 'white';
  };

  return (
    <Box
      height={'100px'}
      borderWidth={1}
      bg={getBgColor()}
      p={1}
      cursor={'pointer'}
    >
      <Text
        p={1}
        fontSize={'sm'}
        rounded={'full'}
        w={'25px'}
        h={'25px'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        fontWeight={'bold'}
        mb={1}
        sx={
          isCurrent
            ? {
                bg: 'esea.primary',
                color: 'white',
              }
            : {}
        }
      >
        {day}
      </Text>
      {events?.map((e) => <CalendarEvent key={e.id} {...e} />)}
    </Box>
  );
};

export default CalendarCell;
