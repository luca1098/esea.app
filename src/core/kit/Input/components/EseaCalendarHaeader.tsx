import { month } from '@/core/utils/calendar';
import { LeftArrowIcon, RightArrowIcon } from '@/kit/Icons/icons';
import { Divider, Flex, IconButton, Stack, Text } from '@chakra-ui/react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

const EseaCalendarHeader = (props: ReactDatePickerCustomHeaderProps) => {
  const monthIndex = new Date(props.date).getMonth();
  const monthLabel = month[monthIndex];
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={4}
      >
        <IconButton
          icon={<LeftArrowIcon />}
          aria-label='Vai al mese precedente'
          onClick={props.decreaseMonth}
          variant={'action'}
        />
        <Flex textAlign={'center'} alignItems={'flex-end'} gap={2}>
          <Text fontWeight={'semibold'} fontSize={'lg'}>
            {monthLabel}
          </Text>
          <Text fontSize={'lg'} fontWeight={'light'} color={'esea.primary'}>
            {new Date(props.date).getFullYear()}
          </Text>
        </Flex>
        <IconButton
          icon={<RightArrowIcon />}
          aria-label='Vai al prossimo mese'
          onClick={props.increaseMonth}
          variant={'action'}
        />
      </Stack>
      <Divider color={'gray.100'} mb={4} />
    </>
  );
};
export default EseaCalendarHeader;
