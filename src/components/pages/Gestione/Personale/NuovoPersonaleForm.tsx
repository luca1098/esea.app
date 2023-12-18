import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { NuovoPersonaleFormValues } from './schemas';
import InputField from '@/kit/Input/InputField';
import SelectField from '@/kit/Input/SelectField';
import {
  PersonaleRoleProps,
  PersonaleSalaryProps,
} from '@/core/types/personale';
import { personaleRoleConfig, salaryConfig } from '../config';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import Button from '@/kit/Button/Button';
import CurrencyInputFormField from '@/kit/Input/CurrencyInputField';
import DataPickerField from '@/kit/Input/DataPickerField';
import { useEffect, useState } from 'react';
import ImageCropModal from '@/components/Crop/ImageCropModal';
import AvatarUploaderField from '@/kit/Input/AvatarUploaderField';
import { nuovoPersonaleFormCustomResolver } from './resolvers';

const defaultValues: NuovoPersonaleFormValues = {
  name: '',
  birthday: null,
  salary: null,
  salaryType: 'HOUR',
  role: 'COLLABORATOR',
};

const NuovoPersonaleForm = () => {
  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [anteprima, setAnteprima] = useState<string | null>();
  const [croppedImg, setCroppedImg] = useState<string | null>();

  const methods = useForm<NuovoPersonaleFormValues>({
    resolver: nuovoPersonaleFormCustomResolver,
    defaultValues,
  });
  const fileValues = useWatch({ control: methods.control, name: 'image' });

  useEffect(() => {
    if (fileValues) {
      const imgUrl = URL.createObjectURL(fileValues);
      setAnteprima(imgUrl);
      setShowCropModal(true);
    }
  }, [fileValues]);

  const handleModalClose = () => {
    clearImageField();
    setShowCropModal(false);
  };

  const clearImageField = () => {
    setAnteprima(null);
    methods.reset({ image: defaultValues.image }, { keepValues: true });
    setCroppedImg(null);
  };

  const handleCropComplete = (file: File, url: string | null) => {
    setShowCropModal(false);
    setAnteprima(null);
    setCroppedImg(url);
  };

  const onSubmit = (values: NuovoPersonaleFormValues) => {
    // eslint-disable-next-line no-console
    console.log({ values });
  };

  return (
    <>
      <Box maxW={800}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid
              gap={2}
              templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
            >
              <GridItem colSpan={{ base: 1, lg: 2 }}>
                <Flex
                  rounded={'2xl'}
                  bg={'esea.gray'}
                  alignItems={{ base: 'center', lg: 'end' }}
                  gap={4}
                  padding={6}
                  direction={{ base: 'column', lg: 'row' }}
                >
                  <AvatarUploaderField
                    name='image'
                    size={'3xl'}
                    preview={croppedImg}
                    isDisabled
                  />
                  {croppedImg ? (
                    <Button
                      label='Rimuovi immagine'
                      onClick={clearImageField}
                      variant='outline'
                    />
                  ) : null}
                </Flex>
              </GridItem>
              <GridItem>
                <InputField name='name' label='Nome e cognome' />
              </GridItem>
              <GridItem>
                <DataPickerField
                  name='birthday'
                  label='Data di nascita'
                  showYearDropdown
                  maxDate={new Date()}
                />
              </GridItem>
              <GridItem colSpan={{ base: 1, lg: 2 }}>
                <SelectField<PersonaleRoleProps>
                  name='role'
                  label='Ruolo'
                  options={personaleRoleConfig}
                  getOptionLabel={({ label }) => label}
                  getKey={({ key }) => key}
                  getValue={({ key }) => key}
                />
              </GridItem>
              <GridItem>
                <CurrencyInputFormField name='salary' label='Paga' />
              </GridItem>
              <GridItem>
                <SelectField<PersonaleSalaryProps>
                  name='salaryType'
                  label='Paga per'
                  options={salaryConfig}
                  getOptionLabel={({ label }) => label}
                  getKey={({ key }) => key}
                  getValue={({ key }) => key}
                />
              </GridItem>
              <GridItem colSpan={{ base: 1, lg: 2 }}>
                <Flex justifyContent={'end'} mt={2}>
                  <Button label='Crea nuovo personale' type='submit' />
                </Flex>
              </GridItem>
            </Grid>
          </form>
        </FormProvider>
      </Box>
      <ImageCropModal
        image={anteprima}
        isOpen={showCropModal}
        onClose={handleModalClose}
        onComplete={handleCropComplete}
      />
    </>
  );
};

export default NuovoPersonaleForm;
