import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { CompanyProps } from '@/core/types/company';

type CompanyBoxProps = {
  isExpandend: boolean;
  company?: CompanyProps;
};

const CompanyBox = ({ company, isExpandend }: CompanyBoxProps) => {
  return (
    <Flex
      bg={'esea.blueLight'}
      p={isExpandend ? 6 : 0}
      rounded={'2xl'}
      gap={4}
      borderWidth={isExpandend ? 1 : 0}
      borderColor={'esea.gray'}
      alignItems={'center'}
    >
      <Box
        position={'relative'}
        w={'60px'}
        h={'60px'}
        overflow={'hidden'}
        rounded={'2xl'}
      >
        <Image
          src={company?.logo ?? ''}
          fill
          style={{ objectFit: 'cover' }}
          alt='Logo azienda'
        />
      </Box>
      {isExpandend ? (
        <Text fontWeight={700} color={'white'}>
          {company?.name}
        </Text>
      ) : null}
    </Flex>
  );
};

export default CompanyBox;
