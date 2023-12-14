import { CalendarBoat } from '@/core/shared/types/barca';
import { Box, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

type BoatCalendarCellProps = {
  boat: CalendarBoat;
};

const BoatCalendarCell = ({ boat }: BoatCalendarCellProps) => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <Box
        height={'50px'}
        w={'50px'}
        display={'block'}
        position={'relative'}
        overflow={'hidden'}
        rounded={'2xl'}
      >
        <Image
          src={boat?.image}
          alt={boat?.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Text fontSize={'sm'}>{boat?.name}</Text>
    </Stack>
  );
};

export default BoatCalendarCell;
