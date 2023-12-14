import { Box } from '@chakra-ui/react';
import BookingCalendarBody from './BookingCalendarBody';
import BookingCalendarHeader from './BookingCalendarHeader';
import useCalendar from './useCalendar';
import { useState } from 'react';
import { CalendarView } from './utils';
import { CalendarBoat } from '@/core/shared/types/barca';

type BookingCalendarProps = {
  boats: CalendarBoat[];
  openCreateEventDrawer: () => void;
};

const BookingCalendar = ({
  boats,
  openCreateEventDrawer,
}: BookingCalendarProps) => {
  const {
    currentMontLabel,
    currentYear,
    weekDays,
    daysInWeek,
    onNext,
    onPrev,
  } = useCalendar();
  const [view, setView] = useState<CalendarView>('settimana');

  return (
    <Box>
      <BookingCalendarHeader
        currentMontLabel={currentMontLabel}
        currentYear={currentYear}
        view={view}
        weekDays={weekDays}
        setView={setView}
        onNext={onNext}
        onPrev={onPrev}
      />
      {boats?.map((b) => (
        <BookingCalendarBody
          key={b.id}
          days={daysInWeek}
          view={view}
          boat={b}
          currentYear={currentYear}
          currentMontLabel={currentMontLabel}
          openCreateEventDrawer={openCreateEventDrawer}
        />
      ))}
    </Box>
  );
};

export default BookingCalendar;
