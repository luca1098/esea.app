import { Box } from '@chakra-ui/react';
import BookingCalendarBody from './BookingCalendarBody';
import BookingCalendarHeader from './BookingCalendarHeader';
import useCalendar from './useCalendar';
import { useState } from 'react';
import { CalendarView } from './utils';
import { fakeBoats } from 'mok';

const BookingCalendar = () => {
  const {
    currentMontLabel,
    currentYear,
    currentMont,
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
      {fakeBoats?.map((b) => (
        <BookingCalendarBody
          key={b.id}
          days={daysInWeek}
          view={view}
          boat={b}
          currentYear={currentYear}
        />
      ))}
    </Box>
  );
};

export default BookingCalendar;
