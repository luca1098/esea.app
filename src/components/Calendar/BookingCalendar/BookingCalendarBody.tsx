import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { CalendarView, getDayEvents } from './utils';
import CalendarCell from './components/CalendarCell';
import { CalendarBoat } from '@/core/shared/types/barca';
import BoatCalendarCell from './components/BoatCalendarCell';
import { Event } from '@/core/shared/types/event';

type DayOfMontProps = {
  numbDay: number;
  weekDayIndex: number;
  monthIndex: number;
};

type BookingCalendarBodyProps = {
  days: DayOfMontProps[];
  view: CalendarView;
  boat: CalendarBoat;
  currentYear: number;
};
const BookingCalendarBody = ({
  days,
  boat,
  currentYear,
}: BookingCalendarBodyProps) => {
  const today = new Date();
  const isCurrentDay = (day: DayOfMontProps) =>
    day.monthIndex === today.getMonth() && day.numbDay === today.getDate();

  return (
    <Grid templateColumns='repeat(8, 1fr)'>
      <GridItem>
        <BoatCalendarCell boat={boat} />
      </GridItem>
      {days?.map((d, i) => {
        const currEvents =
          getDayEvents(d.numbDay, d.monthIndex, currentYear)(boat.events) || [];
        return (
          <GridItem key={i}>
            <CalendarCell
              day={d.numbDay}
              isCurrent={isCurrentDay(d)}
              events={currEvents}
            />
          </GridItem>
        );
      })}
      {/* {JSON.stringify(daysOfCurrentMonth)} */}
    </Grid>
  );
};

export default BookingCalendarBody;
