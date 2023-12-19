import { Box, Popover, PopoverTrigger, Stack, Text } from '@chakra-ui/react';
import CalendarEvent, {
  CalendarEventProps,
} from '../../components/CalendarEvent';
import CellPopperContent from './CellPopperContent';

export type CalendarCellProps = {
  day: number;
  isCurrent: boolean;
  events: Omit<CalendarEventProps, 'resticted' | 'index'>[];
  currentMontLabel: string;
  onNuovoClick: () => void;
};

const CalendarCell = ({
  day,
  isCurrent,
  events,
  currentMontLabel,
  onNuovoClick,
}: CalendarCellProps) => {
  const getBgColor = () => {
    if (isCurrent) return 'gray.50';
    return 'white';
  };
  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Box
              height={'100px'}
              borderWidth={1}
              bg={getBgColor()}
              p={1}
              cursor={'pointer'}
              overflowY={'scroll'}
              css={{
                '&': {
                  '-ms-overflow-style': 'none',
                  'scrollbar-width': 'none',
                },
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
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
              <Stack gap={1}>
                {events?.map((e, i) => (
                  <CalendarEvent key={e.id} {...e} index={i} restricted />
                ))}
              </Stack>
            </Box>
          </PopoverTrigger>
          <CellPopperContent
            day={day}
            currentMontLabel={currentMontLabel}
            events={events}
            onNuovoClick={onNuovoClick}
            closePopover={onClose}
          />
        </>
      )}
    </Popover>
  );
};

export default CalendarCell;
