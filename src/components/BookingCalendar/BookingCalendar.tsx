import { Box } from '@chakra-ui/react';
import BookingCalendarBody from './BookingCalendarBody';
import BookingCalendarHeader from './BookingCalendarHeader';
import useCalendar from './useCalendar';
import { useState } from 'react';
import { CalendarView } from './utils';

const BookingCalendar = () => {
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
      <BookingCalendarBody days={daysInWeek} view={view} />
    </Box>
  );
};

export default BookingCalendar;
