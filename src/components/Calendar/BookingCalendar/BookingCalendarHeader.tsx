import { Grid, GridItem, IconButton, Stack, Text } from '@chakra-ui/react';
import { LeftArrowIcon, RightArrowIcon } from '@/kit/Icons/icons';
import { ActionButton } from '@/kit/Button/ActionButton';
import { CalendarView, viewButtons } from './utils';
import { Dispatch, SetStateAction } from 'react';

type BookingCalendarHeaderProps = {
  currentMontLabel?: string;
  currentYear?: number;
  view: CalendarView;
  weekDays: string[];
  setView: Dispatch<SetStateAction<CalendarView>>;
  onNext: () => void;
  onPrev: () => void;
};
const BookingCalendarHeader = ({
  currentMontLabel,
  currentYear,
  view,
  weekDays,
  setView,
  onPrev,
  onNext,
}: BookingCalendarHeaderProps) => {
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack direction={'row'}>
          <IconButton
            as={LeftArrowIcon}
            aria-label='Vai al mese precedente'
            size={'xs'}
            onClick={onPrev}
          />
          <Text>
            {currentMontLabel} {currentYear}
          </Text>
          <IconButton
            as={RightArrowIcon}
            aria-label='Vai al mese successivo'
            size={'xs'}
            onClick={onNext}
          />
        </Stack>
        <Stack direction={'row'} gap={2}>
          {viewButtons.map((b) => (
            <ActionButton
              key={b.value}
              label={b.label}
              isActive={view === b.value}
              onClick={() => setView(b.value)}
            />
          ))}
        </Stack>
      </Stack>
      <Stack>
        <Grid templateColumns='repeat(8, 1fr)'>
          <GridItem>Barca</GridItem>
          {weekDays?.map((day) => <GridItem key={day}>{day}</GridItem>)}
        </Grid>
      </Stack>
    </>
  );
};

export default BookingCalendarHeader;
