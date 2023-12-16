import {
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
} from '@chakra-ui/react';
import Button from '@/kit/Button/Button';
import { CalendarCellProps } from './CalendarCell';
import CalendarEvent from '../../components/CalendarEvent';
import EmptyBox from '@/components/Empty/EmptyBox';

type CellPopperContentProps = { closePopover: () => void } & Pick<
  CalendarCellProps,
  'day' | 'currentMontLabel' | 'events' | 'onNuovoClick'
>;

const CellPopperContent = ({
  day,
  currentMontLabel,
  events,
  onNuovoClick,
  closePopover,
}: CellPopperContentProps) => {
  console.log('###', day);
  return (
    <PopoverContent>
      <PopoverHeader fontWeight='semibold'>{`${day} ${currentMontLabel}`}</PopoverHeader>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverBody>
        {events?.length > 0 ? (
          events?.map((e, i) => <CalendarEvent key={e.id} {...e} index={i} />)
        ) : (
          <EmptyBox msg='Ancora nessun evento in programma' />
        )}
      </PopoverBody>
      <PopoverFooter>
        <Button
          label='Nuovo evento'
          onClick={() => {
            closePopover();
            onNuovoClick();
          }}
        />
      </PopoverFooter>
    </PopoverContent>
  );
};

export default CellPopperContent;
