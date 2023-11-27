import { Box, Text } from '@chakra-ui/react';

type CalendarCellProps = {
  day: number;
  isCurrent: boolean;
  isOtherMonth: boolean;
};
const CalendarCell = ({ day, isCurrent, isOtherMonth }: CalendarCellProps) => {
  const getBgColor = () => {
    if (isCurrent) return 'gray.50';
    if (isOtherMonth) return 'gray.100';
    return 'white';
  };

  return (
    <Box height={'100px'} borderWidth={1} bg={getBgColor()}>
      <Text
        p={1}
        fontSize={'sm'}
        rounded={'full'}
        w={'25px'}
        h={'25px'}
        m={0.5}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        fontWeight={'bold'}
        sx={
          isCurrent
            ? {
                bg: 'esea.primary',
                color: 'white',
              }
            : {}
        }
      >
        {day}
      </Text>
    </Box>
  );
};

export default CalendarCell;
