import Button from '@/kit/Button/Button';
import FormField from '@/kit/Form/FormField';
import DataPickerField from '@/kit/Input/DataPickerField';
import InputField from '@/kit/Input/InputField';
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
  Stack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type NuovoEventoDrawerProps = { selectedDate: Date } & Pick<
  DrawerProps,
  'isOpen' | 'onClose'
>;

const NuovoEventoDrawer = ({
  selectedDate,
  isOpen,
  onClose,
}: NuovoEventoDrawerProps) => {
  const firstField = useRef<HTMLInputElement>(null);
  const methods = useForm();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Aggiungi evento</DrawerHeader>

          <DrawerBody>
            <Box>Barca selezionanta</Box>
            <FormProvider {...methods}>
              <form>
                <Stack gap={4}>
                  <InputField name='name' label='Nome evento' />
                  <DataPickerField
                    name='from'
                    label='Data inizio'
                    withPortal={false}
                    showTimeSelect
                  />
                  <DataPickerField
                    name='to'
                    label='Data fine'
                    withPortal={false}
                    showTimeSelect
                  />

                  <Box>Informazioni sul cliente</Box>
                  <InputField name='people' />
                  <Box>Associa skipper</Box>
                </Stack>
              </form>
            </FormProvider>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button label='Chiudi' onClick={onClose} variant='outline' />
            <Button label='Crea evento' />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NuovoEventoDrawer;
