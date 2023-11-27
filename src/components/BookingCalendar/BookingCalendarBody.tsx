import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { CalendarView } from './utils';
import CalendarCell from './components/DayCell';

type DayOfMontProps = {
  numbDay: number;
  weekDayIndex: number;
  monthIndex: number;
};

type BookingCalendarBodyProps = {
  days: DayOfMontProps[];
  view: CalendarView;
};
const BookingCalendarBody = ({ days }: BookingCalendarBodyProps) => {
  const today = new Date();
  const isCurrentDay = (day: DayOfMontProps) =>
    day.monthIndex === today.getMonth() && day.numbDay === today.getDate();

  const isOtherMonth = (monthId: number) => monthId !== today.getMonth();
  return (
    <Grid templateColumns='repeat(7, 1fr)'>
      {days?.map((d, i) => (
        <GridItem key={i}>
          <CalendarCell
            day={d.numbDay}
            isCurrent={isCurrentDay(d)}
            isOtherMonth={isOtherMonth(d.monthIndex)}
          />
        </GridItem>
      ))}
      {/* {JSON.stringify(daysOfCurrentMonth)} */}
    </Grid>
  );
};

export default BookingCalendarBody;
