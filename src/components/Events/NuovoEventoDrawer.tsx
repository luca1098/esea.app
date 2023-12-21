import { BoatProps } from '@/core/types/barca';
import { PersonaleBaseProps } from '@/core/types/personale';
import { ServiceProps } from '@/core/types/services';
import { Nullish } from '@/core/types/utils';
import { filterTimeByHoursAndEvent } from '@/core/utils/date';
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
import { useCallback, useEffect, useRef } from 'react';
import { FormProvider, UseFormReturn, useWatch } from 'react-hook-form';
import { NuovoEventoFormProps } from '@/core/types/event';
import { setHours } from 'date-fns';
import { CanaleProps } from '@/core/types/canale';

type NuovoEventoDrawerProps = {
  selectedDateFrom: Nullish<Date>;
  selectedBoat: Nullish<BoatProps>;
  personale: PersonaleBaseProps[];
  isLoading: boolean;
  canali: CanaleProps[];
  methods: UseFormReturn<NuovoEventoFormProps>;
  onCreate: (values: NuovoEventoFormProps) => void;
} & Pick<DrawerProps, 'isOpen' | 'onClose'>;

const NuovoEventoDrawer = ({
  selectedDateFrom,
  selectedBoat,
  personale,
  isOpen,
  isLoading,
  methods,
  canali,
  onClose,
  onCreate,
}: NuovoEventoDrawerProps) => {
  const firstField = useRef<HTMLInputElement>(null);

  const dataFrom = useWatch({ control: methods.control, name: 'from' });

  const initForm = useCallback(() => {
    if (selectedDateFrom) {
      if (!selectedBoat?.events || !selectedBoat?.events.length) {
        const dataTo = setHours(
          selectedDateFrom,
          selectedDateFrom.getHours() + 2,
        );
        methods.setValue('from', selectedDateFrom);
        methods.setValue('to', dataTo);
      } else {
        const lastEvent =
          selectedBoat?.events[selectedBoat?.events?.length - 1];
        const lastEventDate = new Date(lastEvent?.to);
        const dataTo = setHours(lastEventDate, lastEventDate.getHours() + 2);

        methods.setValue('from', lastEventDate);
        methods.setValue('to', dataTo);
      }
    }
  }, [selectedBoat, selectedDateFrom, methods]);

  useEffect(() => {
    if (isOpen && selectedDateFrom) {
      initForm();
    }
  }, [isOpen, selectedDateFrom, initForm]);

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
                    label='Ora inizio'
                    placeholder='Ora inizio'
                    showTimeSelectOnly
                    withPortal={false}
                    showTimeSelect
                    calendarClassName='esea-event-calendar'
                    filterTime={(date) =>
                      filterTimeByHoursAndEvent(date)(
                        selectedBoat?.events || [],
                      )
                    }
                    isRequired
                  />
                  <DataPickerField
                    name='to'
                    label='Ora fine'
                    placeholder='Ora fine'
                    withPortal={false}
                    showTimeSelectOnly
                    minDate={dataFrom}
                    showTimeSelect
                    calendarClassName='esea-event-calendar'
                    filterTime={(date) =>
                      filterTimeByHoursAndEvent(date)(
                        selectedBoat?.events || [],
                      )
                    }
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
                  />
                  <Text fontWeight={700}>Dettagli</Text>
                  <SelectField<CanaleProps>
                    name='canale'
                    label='Canale'
                    placeholder='Seleziona un canale'
                    getKey={({ id }) => id}
                    getValue={({ id }) => id}
                    getOptionLabel={({ label }) => label}
                    options={canali || []}
                  />
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
