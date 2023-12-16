import { Box } from '@chakra-ui/react';
import BookingCalendarBody from './BookingCalendarBody';
import BookingCalendarHeader from './BookingCalendarHeader';
import useCalendar from './useCalendar';
import { Dispatch, SetStateAction, useState } from 'react';
import { CalendarView } from './utils';
import { BoatProps } from '@/core/shared/types/barca';
import { Nullish } from '@/core/shared/types/utils';

type BookingCalendarProps = {
  boats: BoatProps[];
  setSelectedBoat: Dispatch<SetStateAction<Nullish<BoatProps>>>;
  setSelectedDataFrom: Dispatch<SetStateAction<Nullish<Date>>>;
};

const BookingCalendar = ({
  boats,
  setSelectedBoat,
  setSelectedDataFrom,
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
          setSelectedBoat={setSelectedBoat}
          setSelectedDataFrom={setSelectedDataFrom}
        />
      ))}
    </Box>
  );
};

export default BookingCalendar;
