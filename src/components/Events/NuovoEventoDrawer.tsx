import { BoatProps } from '@/core/types/barca';
import { PersonaleBaseProps } from '@/core/types/personale';
import { ServiceProps } from '@/core/types/services';
import { Nullish } from '@/core/types/utils';
import { filterTimeByHours } from '@/core/utils/date';
import Button from '@/kit/Button/Button';
import DataPickerField from '@/kit/Input/DataPickerField';
import InputField from '@/kit/Input/InputField';
import NumberInputField from '@/kit/Input/NumberInputField';
import PhoneInputField from '@/kit/Input/PhoneInputField';
import SelectField from '@/kit/Input/SelectField';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { FormProvider, UseFormReturn, useWatch } from 'react-hook-form';
import { NuovoEventoFormProps } from '@/core/types/event';

type NuovoEventoDrawerProps = {
  selectedDate: Nullish<Date>;
  selectedBoat: Nullish<BoatProps>;
  personale: PersonaleBaseProps[];
  isLoading: boolean;
  methods: UseFormReturn<NuovoEventoFormProps>;
  onCreate: (values: NuovoEventoFormProps) => void;
} & Pick<DrawerProps, 'isOpen' | 'onClose'>;

const NuovoEventoDrawer = ({
  selectedDate,
  selectedBoat,
  personale,
  isOpen,
  isLoading,
  methods,
  onClose,
  onCreate,
}: NuovoEventoDrawerProps) => {
  const firstField = useRef<HTMLInputElement>(null);

  const dataFrom = useWatch({ control: methods.control, name: 'from' });

  useEffect(() => {
    if (isOpen && selectedDate) {
      methods.setValue('from', selectedDate);
      methods.setValue('to', selectedDate); // da cambiare
    }
  }, [isOpen, selectedDate, methods]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Aggiungi evento</DrawerHeader>

          <DrawerBody pb={24}>
            <Text fontWeight={700}>Barca</Text>
            <Flex bg={'esea.gray'} rounded={'2xl'} padding={4} mb={2}>
              <Box
                position={'relative'}
                height={'80px'}
                width={'80px'}
                rounded={'2xl'}
                overflow={'hidden'}
              >
                <Image
                  src={selectedBoat?.image ?? ''}
                  alt={selectedBoat?.name ?? ''}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Box>
                <Text>{selectedBoat?.name}</Text>
              </Box>
            </Flex>
            <FormProvider {...methods}>
              <form>
                <Stack gap={4}>
                  <SelectField<ServiceProps>
                    name='service'
                    label='Servizio'
                    placeholder='Seleziona un servizio'
                    getKey={({ id }) => id}
                    getValue={({ slug }) => slug}
                    getOptionLabel={({ label }) => label}
                    options={selectedBoat?.services || []}
                    isRequired
                  />
                  <DataPickerField
                    name='from'
                    label='Data inizio'
                    placeholder='Data inizio'
                    withPortal={false}
                    showTimeSelect
                    calendarClassName='esea-event-calendar'
                    filterTime={(date) => filterTimeByHours(date, 6)}
                    isRequired
                  />
                  <DataPickerField
                    name='to'
                    label='Data fine'
                    placeholder='Data fine'
                    withPortal={false}
                    minDate={dataFrom}
                    showTimeSelect
                    calendarClassName='esea-event-calendar'
                    filterTime={(date) => filterTimeByHours(date, 6)}
                    isRequired
                  />

                  <Text fontWeight={700}>Informazioni sul cliente</Text>
                  <InputField
                    name='clientName'
                    label='Nome'
                    placeholder='Nome e cognome'
                  />
                  <InputField
                    name='clientEmail'
                    label='Email'
                    placeholder='Email'
                  />
                  <NumberInputField
                    name='clientPeople'
                    label='Numero persone'
                    placeholder='Numero persone'
                  />
                  <PhoneInputField
                    name='clientPhone'
                    label='Cellulare'
                    placeholder='Cellulare'
                  />
                  <Text fontWeight={700}>Associa skipper</Text>
                  <SelectField<PersonaleBaseProps>
                    name='skipper'
                    label='Skipper'
                    placeholder='Seleziona uno skipper'
                    getKey={({ id }) => id}
                    getValue={({ id }) => id}
                    getOptionLabel={({ name }) => name}
                    options={personale || []}
                    isRequired
                  />
                  <Text fontWeight={700}>Note</Text>
                  <InputField name='note' label='Note' placeholder='Note' />
                </Stack>
              </form>
            </FormProvider>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Flex gap={2}>
              <Button
                label='Chiudi'
                onClick={onClose}
                variant='outline'
                isLoading={isLoading}
              />
              <Button
                label='Crea evento'
                onClick={methods.handleSubmit(onCreate)}
                isLoading={isLoading}
              />
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NuovoEventoDrawer;
