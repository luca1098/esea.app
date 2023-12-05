import { Box, Card, CardBody, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { CardBarcheProps } from './types';
import Button from '@/kit/Button/Button';

const CardBarche = ({ image, name, id }: CardBarcheProps) => {
  return (
    <Card maxW='xs' padding={0}>
      <CardBody>
        <Flex gap={5} direction={'column'} alignItems={'center'}>
          <Box
            w={'200px'}
            h={'150px'}
            position={'relative'}
            rounded={'2xl'}
            overflow={'hidden'}
          >
            <Image
              src={image}
              alt={`Barca ${name}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Heading as={'h4'} variant={'h3'}>
            {name}
          </Heading>
          <Flex gap={2}>
            <Button label='Modifica' variant='outline' />
            <Button label='Dettaglio' />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CardBarche;
