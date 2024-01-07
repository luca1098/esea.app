import { BoatProps } from '@/core/types/barca';
import { formatCurrency } from '@/core/utils/currencies';
import {
  Box,
  Heading,
  Text,
  Divider,
  Grid,
  GridItem,
  Flex,
} from '@chakra-ui/react';

type ServicesDetailsProps = {
  services: BoatProps['services'];
};

const ServicesDetails = ({ services }: ServicesDetailsProps) => {
  return (
    <>
      <Heading variant={'h3'} as={'h3'}>
        Servizi
      </Heading>
      {services?.map((s) => (
        <Box
          key={s.id}
          gap={2}
          alignItems={'center'}
          rounded={'2xl'}
          bg={'esea.gray'}
          p={6}
        >
          <Text fontWeight={'medium'} fontSize={'xl'}>
            {s.label}
          </Text>
          <Divider my={2} />
          <Grid templateColumns={'repeat(3, 1fr)'} mt={4}>
            <GridItem colSpan={3}>
              <Heading variant={'h4'} as={'h4'}>
                Durate
              </Heading>
            </GridItem>
            {s.durations?.map((d) => (
              <GridItem key={d.id} colSpan={3}>
                <Flex gap={6}>
                  <Text>{d.label}</Text>
                  <Text fontWeight={'bold'}>{formatCurrency(d.price)}</Text>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default ServicesDetails;
