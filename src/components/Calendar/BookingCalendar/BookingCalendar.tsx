import { Skeleton, Stack } from '@chakra-ui/react';
import BookingCalendarBody from './BookingCalendarBody';
import BookingCalendarHeader from './BookingCalendarHeader';
import useCalendar from './useCalendar';
import { Dispatch, SetStateAction, useState } from 'react';
import { CalendarView } from './utils';
import { BoatProps } from '@/core/types/barca';
import { Nullish } from '@/core/types/utils';

type BookingCalendarProps = {
  boats: BoatProps[];
  isLoading?: boolean;
  setSelectedBoat: Dispatch<SetStateAction<Nullish<BoatProps>>>;
  setSelectedDataFrom: Dispatch<SetStateAction<Nullish<Date>>>;
};

const BookingCalendar = ({
  boats,
  isLoading,
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
    <Stack overflowX={'scroll'} gap={0}>
      <BookingCalendarHeader
        currentMontLabel={currentMontLabel}
        currentYear={currentYear}
        view={view}
        weekDays={weekDays}
        setView={setView}
        onNext={onNext}
        onPrev={onPrev}
      />
      <Skeleton isLoaded={!isLoading}>
        <Stack gap={0}>
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
        </Stack>
      </Skeleton>
    </Stack>
  );
};

export default BookingCalendar;
