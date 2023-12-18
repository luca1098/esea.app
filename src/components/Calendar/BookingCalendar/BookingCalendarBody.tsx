import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';
import { CalendarView, getDayEvents } from './utils';
import CalendarCell from './components/CalendarCell';
import { BoatProps, CalendarBoat } from '@/core/types/barca';
import BoatCalendarCell from './components/BoatCalendarCell';
import { HeaderCell } from './components/HeaderCell';
import { useBoatEvents } from '@/components/pages/shared/queries';
import { DayOfMontProps } from './types';
import { Nullish } from '@/core/types/utils';
import { setHours } from 'date-fns';

export type BookingCalendarBodyProps = {
  days: DayOfMontProps[];
  view: CalendarView;
  boat: BoatProps;
  currentMontLabel: string;
  currentYear: number;
  setSelectedBoat: Dispatch<SetStateAction<Nullish<BoatProps>>>;
  setSelectedDataFrom: Dispatch<SetStateAction<Nullish<Date>>>;
};

const BookingCalendarBody = ({
  days,
  boat,
  currentYear,
  currentMontLabel,
  setSelectedBoat,
  setSelectedDataFrom,
}: BookingCalendarBodyProps) => {
  const today = new Date();
  const { data } = useBoatEvents({ boatId: boat.id });
  const { boatEvents } = data || {};

  const isCurrentDay = (day: DayOfMontProps) =>
    day.monthIndex === today.getMonth() && day.numbDay === today.getDate();
  const handleNuovoEventoClick = (d: DayOfMontProps) => {
    const selectedDate = setHours(
      new Date(currentYear, d.monthIndex, d.numbDay),
      8,
    );
    setSelectedBoat(boat);
    setSelectedDataFrom(selectedDate);
  };

  console.log('###', { b: boatEvents });

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
              onNuovoClick={() => handleNuovoEventoClick(d)}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default BookingCalendarBody;
