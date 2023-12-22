import { Nullish } from '@/core/types/utils';
import { Text, Stack, Box } from '@chakra-ui/react';
import Image from 'next/image';

type BoatCell = {
  image?: Nullish<string>;
  name?: string;
};

const BoatCell = ({ name, image }: BoatCell) => {
  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Box
        width={'40px'}
        height={'40px'}
        rounded={'lg'}
        position={'relative'}
        overflow={'hidden'}
      >
        <Image
          src={image ?? ''}
          alt={`${name}`}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Text fontWeight={'medium'}>{name}</Text>
    </Stack>
  );
};

export default BoatCell;
