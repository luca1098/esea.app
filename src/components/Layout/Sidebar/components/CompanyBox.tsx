import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import COMPANY_PLACEHOLDER from '@/assets/company-placeholder.svg';

type CompanyBoxProps = {
  isExpandend: boolean;
};

const CompanyBox = ({ isExpandend }: CompanyBoxProps) => {
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
          src={COMPANY_PLACEHOLDER}
          fill
          style={{ objectFit: 'cover' }}
          alt='Logo azienda'
        />
      </Box>
      {isExpandend ? (
        <Text fontWeight={700} color={'white'}>
          Unavita vista mare
        </Text>
      ) : null}
    </Flex>
  );
};

export default CompanyBox;
