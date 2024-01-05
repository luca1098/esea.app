import InputField from '@/kit/Input/InputField';
import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import Button from '@/kit/Button/Button';
import { UseFormReturn } from 'react-hook-form';
import { FormInserisciBarca } from '../schemas';
import AddServicesTag from './AddServicesTag';
import { DEFAULT_SERVICES } from '@/core/config/services';
import { ServiceProps } from '@/core/types/services';
import CurrencyInputFormField from '@/kit/Input/CurrencyInputField';
import { PlusIcon, RemoveIcon } from '@/kit/Icons/icons';

type ServicesFieldsProps = {
  methods: UseFormReturn<FormInserisciBarca>;
};

const ServicesFields = ({ methods }: ServicesFieldsProps) => {
  const currentServices = useWatch({
    control: methods.control,
    name: 'services',
  });

  const isDefaultServiceAdded = (id: string) =>
    (currentServices || []).some((s) => s?.id === id);

  const { fields, append, prepend, remove } = useFieldArray({
    control: methods.control,
    name: 'services',
  });

  const handleAddDefaultService = (service: ServiceProps) => {
    const serviceToAdd = {
      label: service.label,
      id: service.id,
      durations: [
        {
          label: 'Intera giornata',
          price: 0,
        },
      ],
    };
    prepend(serviceToAdd);
  };
  return (
    <>
      <Heading variant={'h3'} as={'h3'}>
        Servizi
      </Heading>
      <Stack bg={'esea.gray'} rounded={'2xl'} p={6} gap={2} mb={6}>
        <Text fontSize={'sm'}>Servizi più usati:</Text>
        <Flex gap={2}>
          {DEFAULT_SERVICES.map((s, i) => (
            <AddServicesTag
              key={i}
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
            <GridItem colSpan={{ base: 4, md: 3 }}>
              <InputField
                name={`services.${index}.label`}
                label='Nome servizio'
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }} alignSelf={'end'}>
              <Button
                label='Rimuovi'
                type='button'
                onClick={() => remove(index)}
                disabled={currentServices.length <= 1}
              />
            </GridItem>

            <GridItem colSpan={{ base: 4, md: 3 }}>
              <Grid
                templateColumns={'repeat(4, 1fr)'}
                gap={4}
                bgColor={'esea.gray'}
                p={6}
                rounded={'2xl'}
              >
                <DurataFields nestedIndex={index} methods={methods} />
              </Grid>
            </GridItem>
            {fields.length - 1 !== index ? (
              <GridItem colSpan={4}>
                <Divider w={'full'} />
              </GridItem>
            ) : null}
          </Fragment>
        ))}
      </Grid>
      <Stack alignItems={'end'}>
        <Button
          label='Aggiungi servizio'
          onClick={() =>
            append({
              label: '',
              durations: [{ label: 'Intera giornata', price: 0 }],
            })
          }
          variant='outline'
        />
      </Stack>
    </>
  );
};

export default ServicesFields;

type DurataFieldsProps = {
  nestedIndex: number;
  methods: UseFormReturn<FormInserisciBarca>;
};

const DurataFields = ({ nestedIndex, methods }: DurataFieldsProps) => {
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: `services.${nestedIndex}.durations`,
  });

  const handleAdd = () => {
    const newDuration = {
      label: '',
      price: 0,
    };
    append(newDuration);
  };

  return (
    <>
      {fields.map((f, i) => {
        return (
          <Fragment key={f.id}>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <InputField
                name={`services.${nestedIndex}.durations.${i}.label`}
                label='Durata'
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <CurrencyInputFormField
                name={`services.${nestedIndex}.durations.${i}.price`}
                label='Prezzo'
              />
            </GridItem>
            <GridItem colSpan={{ base: 2 }} alignSelf={'end'}>
              <IconButton
                icon={<RemoveIcon />}
                aria-label='Rimuovi'
                variant={'outline'}
                isDisabled={i === 0}
                onClick={() => remove(i)}
                mr={2}
              />
              {i === fields.length - 1 ? (
                <IconButton
                  icon={<PlusIcon />}
                  aria-label='Aggiungi durata'
                  variant={'outline'}
                  onClick={handleAdd}
                />
              ) : null}
            </GridItem>
          </Fragment>
        );
      })}
    </>
  );
};
