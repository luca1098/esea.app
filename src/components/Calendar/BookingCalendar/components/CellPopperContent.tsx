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
  return (
    <PopoverContent>
      <PopoverHeader fontWeight='semibold'>{`${day} ${currentMontLabel}`}</PopoverHeader>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverBody>
        {events?.length > 0 ? (
          events?.map((e, i) => <CalendarEvent key={e.id} {...e} index={i} />)
        ) : (
          <p>Ancora nessun evento in programma (TODO cambiare)</p>
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
