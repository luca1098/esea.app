import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { CalendarView, getDayEvents } from './utils';
import CalendarCell from './components/CalendarCell';
import { CalendarBoat } from '@/core/shared/types/barca';
import BoatCalendarCell from './components/BoatCalendarCell';
import { HeaderCell } from './components/HeaderCell';
import { useBoatEvents } from '@/components/pages/shared/queries';
import { DayOfMontProps } from './types';

export type BookingCalendarBodyProps = {
  days: DayOfMontProps[];
  view: CalendarView;
  boat: CalendarBoat;
  currentMontLabel: string;
  currentYear: number;
  openCreateEventDrawer: () => void;
};

const BookingCalendarBody = ({
  days,
  boat,
  currentYear,
  currentMontLabel,
  openCreateEventDrawer,
}: BookingCalendarBodyProps) => {
  const today = new Date();
  const { data } = useBoatEvents({ boatId: boat.id });
  const { boatEvents } = data || {};

  const isCurrentDay = (day: DayOfMontProps) =>
    day.monthIndex === today.getMonth() && day.numbDay === today.getDate();

  return (
    <Grid templateColumns='repeat(8, 1fr)'>
      <HeaderCell borderWidth={1} borderColor={'gray.100'}>
        <BoatCalendarCell boat={boat} />
      </HeaderCell>
      {days?.map((d, i) => {
        const currEvents =
          getDayEvents(d.numbDay, d.monthIndex, currentYear)(boatEvents) || [];
        return (
          <GridItem key={i}>
            <CalendarCell
              day={d.numbDay}
              isCurrent={isCurrentDay(d)}
              events={currEvents}
              currentMontLabel={currentMontLabel}
              onNuovoClick={openCreateEventDrawer}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default BookingCalendarBody;
