import { Nullish } from '@/core/types/utils';
import { Box, Text } from '@chakra-ui/react';

type ValueWithLabelProps = {
  label: string;
  value?: Nullish<string>;
};

const ValueWithLabel = ({ label, value }: ValueWithLabelProps) => {
  return (
    <Box>
      <Text fontWeight={'bold'} fontSize={'sm'}>
        {label}
      </Text>
      <Text>{value || '-'}</Text>
    </Box>
  );
};

export default ValueWithLabel;
