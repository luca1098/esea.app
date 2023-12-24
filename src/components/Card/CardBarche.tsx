import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { CardBarcheProps } from './types';
import Button from '@/kit/Button/Button';
import { TrashIcon } from '@/kit/Icons/icons';

const CardBarche = ({
  image,
  name,
  id,
  isDeleteLoading,
  onDelete,
}: CardBarcheProps) => {
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
            {!!onDelete ? (
              <IconButton
                icon={<TrashIcon />}
                onClick={() => onDelete(id)}
                aria-label='Elimina la barca'
                variant={'outline'}
                isLoading={isDeleteLoading}
              />
            ) : null}
            <Button label='Modifica' variant='outline' />
            <Button label='Dettaglio' />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CardBarche;
