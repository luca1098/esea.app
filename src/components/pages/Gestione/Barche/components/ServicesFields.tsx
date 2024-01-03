import InputField from '@/kit/Input/InputField';
import { Flex, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import Button from '@/kit/Button/Button';
import { UseFormReturn } from 'react-hook-form';
import { FormInserisciBarca } from '../schemas';
import AddServicesTag from './AddServicesTag';
import { DEFAULT_SERVICES } from '@/core/config/services';
import { ServiceProps } from '@/core/types/services';
import { uniqueId } from 'lodash';
import CurrencyInputFormField from '@/kit/Input/CurrencyInputField';

type ServicesFieldsProps = {
  methods: UseFormReturn<FormInserisciBarca>;
};

const ServicesFields = ({ methods }: ServicesFieldsProps) => {
  const currentServices = useWatch({
    control: methods.control,
    name: 'services',
  });

  const isDefaultServiceAdded = (id: string) =>
    (currentServices || []).some((s) => s.id === id);

  const { fields, append, prepend, remove } = useFieldArray({
    control: methods.control,
    name: 'services',
  });

  const handleAddDefaultService = (service: ServiceProps) => {
    const serviceToAdd = { label: service.label, price: 0, id: service.id };
    currentServices.length === 1 ? prepend(serviceToAdd) : append(serviceToAdd);
  };

  return (
    <>
      <Heading variant={'h3'} as={'h3'}>
        Servizi
      </Heading>
      <Stack bg={'esea.gray'} rounded={'2xl'} p={6} gap={2} mb={6}>
        <Text fontSize={'sm'}>Servizi più usati:</Text>
        <Flex gap={2}>
          {DEFAULT_SERVICES.map((s) => (
            <AddServicesTag
              key={s.id}
              service={s}
              onAddClick={handleAddDefaultService}
              isAdded={isDefaultServiceAdded(s.id)}
            />
          ))}
        </Flex>
      </Stack>
      <Grid templateColumns='repeat(4, 1fr)' gap={6} mb={6}>
        {fields.map((item, index) => (
          <Fragment key={item.id}>
            <GridItem colSpan={2}>
              <InputField name={`services.${index}.label`} label='Nome' />
            </GridItem>
            <GridItem>
              <CurrencyInputFormField
                name={`services.${index}.price`}
                label='Prezzo'
              />
            </GridItem>
            <GridItem alignSelf={'end'}>
              <Button
                label='Rimuovi'
                type='button'
                onClick={() => remove(index)}
                disabled={currentServices.length <= 1}
              />
            </GridItem>
          </Fragment>
        ))}
      </Grid>
      <Button
        label='Aggiungi'
        onClick={() => append({ label: '', price: 0, id: uniqueId('service') })}
        variant='outline'
      />
    </>
  );
};

export default ServicesFields;
