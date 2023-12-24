import { Box, Text } from '@chakra-ui/react';

type EmptyBoxProps = {
  msg: string;
};

const EmptyBox = ({ msg }: EmptyBoxProps) => {
  return (
    <Box bg={'esea.gray'} p={4} rounded={'lg'} w={'full'}>
      <Text fontStyle={'italic'} fontSize={'sm'} color={'gray.600'}>
        {msg}
      </Text>
    </Box>
  );
};

export default EmptyBox;
