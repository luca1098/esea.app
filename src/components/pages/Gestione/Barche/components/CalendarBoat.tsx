import {
  Box,
  Divider,
  Heading,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Stack,
  Text,
} from '@chakra-ui/react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { FormInserisciBarca } from '../schemas';
import DataPickerInline from '@/kit/Input/DataPickerInline';
import { UnaviableSlotProps } from '@/core/types/barca';
import { dateToTimestamp } from '@/core/utils/date';
import { useState } from 'react';
import Button from '@/kit/Button/Button';
import { isWithinInterval } from 'date-fns';

type CalendarBoatProps = {
  methods: UseFormReturn<FormInserisciBarca>;
};

const CalendarBoat = ({ methods }: CalendarBoatProps) => {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const unaviableSlots = useWatch({
    control: methods.control,
    name: 'unavailableSlots',
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDataChange = (
    dates: Date | null | [Date | null, Date | null],
  ) => {
    if (dates && Array.isArray(dates)) {
      const [from, to] = dates;

      setStartDate(from);
      setEndDate(to);

      if (dates.every((d) => !!d)) {
        setShowPopover(true);
      }
    }
  };

  const addUnaviableSlot = ([from, to]: [Date | null, Date | null]) => {
    const newUnaviableSlot: UnaviableSlotProps = {
      from: dateToTimestamp(from),
      to: dateToTimestamp(to),
    };
    const prevUnaviableSlots = methods.getValues('unavailableSlots') || [];
    methods.setValue('unavailableSlots', [
      ...prevUnaviableSlots,
      newUnaviableSlot,
    ]);
    handlePopoverClose();
  };

  const handlePopoverClose = () => {
    setStartDate(null);
    setEndDate(null);
    setShowPopover(false);
  };

  const filterUnviableDays = (date: Date) => {
    const intervalValid = !unaviableSlots?.some((e) => {
      if (!e.from || !e.to) return false;
      return isWithinInterval(date, {
        start: new Date(e?.from),
        end: new Date(e?.to),
      });
    });

    return intervalValid;
  };

  return (
    <>
      <Heading variant={'h3'} as={'h3'}>
        Calendario
      </Heading>
      <Popover
        isOpen={showPopover}
        onClose={handlePopoverClose}
        placement='left'
      >
        <PopoverAnchor>
          <Box position={{ lg: 'sticky' }} top={10}>
            <DataPickerInline
              calendarClassName='esea-datapicker-inserisci-barche'
              helperText='Selezionando delle date puoi bloccarle oppure inserire un prezzo specifico'
              onChange={handleDataChange}
              minDate={new Date()}
              isRange
              startDate={startDate}
              endDate={endDate}
              filterDate={filterUnviableDays}
            />
          </Box>
        </PopoverAnchor>
        <PopoverContent borderWidth={1} borderColor={'esea.primary'} pb={4}>
          <PopoverCloseButton />
          <PopoverHeader>
            <Text>Seleziona l&apos;azione che vuoi effettuare</Text>
          </PopoverHeader>
          <PopoverBody>
            <Stack>
              <Button
                label='Blocca date'
                onClick={() => addUnaviableSlot([startDate, endDate])}
              />
              <Divider />
              <Button
                label='Cambia prezzo per queste date'
                disabled
                onClick={() => null}
              />
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CalendarBoat;
