import Button from '@/kit/Button/Button';
import InputField from '@/kit/Input/InputField';
import { Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { InfoPersonaliFormProps } from './schemas';
import PhoneInputField from '@/kit/Input/PhoneInputField';
import DataPickerField from '@/kit/Input/DataPickerField';
import AvatarUploaderField from '@/kit/Input/AvatarUploaderField';
import { useCroppedImage } from '@/core/hooks/useCroppedImage';
import { InfoPersonaleFormCustomResolver } from './resolvers';
import { inputToUppercase } from '@/core/utils/normalize';
import { PropsWithUser } from '@/core/types/user';
import { useEffect } from 'react';

type PersonaleStepProps = {
  onNext: (values: InfoPersonaliFormProps) => void;
  loading?: boolean;
} & PropsWithUser;

const PersonaleStep = ({ loading, user, onNext }: PersonaleStepProps) => {
  const methods = useForm<InfoPersonaliFormProps>({
    resolver: InfoPersonaleFormCustomResolver,
  });

  const { renderCropModal, croppedImg, clearImageField, setCroppedImg } =
    useCroppedImage(methods);

  useEffect(() => {
    if (user?.image) setCroppedImg(user.image);
    if (user?.dataNascita)
      methods.setValue('dataNascita', new Date(user.dataNascita));
    if (user?.codFisc) methods.setValue('codFisc', user.codFisc);
    if (user?.phone) methods.setValue('phone', user.phone);
  }, [user, methods, setCroppedImg]);

  return (
    <Stack w={'container.lg'} mx={'auto'}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onNext)}>
          <Grid templateColumns='repeat(1, 1fr)' rowGap={4}>
            <GridItem bg={'esea.gray'} padding={'4'} rounded={'2xl'}>
              <Flex
                alignItems={{ base: 'center', lg: 'end' }}
                gap={4}
                direction={{ base: 'column', lg: 'row' }}
              >
                <AvatarUploaderField
                  name='image'
                  label='Foto profilo'
                  preview={croppedImg}
                  size={'2xl'}
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
              <PhoneInputField
                label='Cellulare'
                name='phone'
                placeholder='Cellulare'
              />
            </GridItem>
            <GridItem>
              <InputField
                label='Cod.Fiscale/P.Iva'
                name='codFisc'
                placeholder='Cod.Fiscale/P.Iva'
                normalize={inputToUppercase}
                maxLength={16}
              />
            </GridItem>
            <GridItem>
              <DataPickerField
                label='Data di nascita'
                name='dataNascita'
                placeholder='Data di nascita'
                showYearDropdown
                maxDate={new Date()}
              />
            </GridItem>
            <GridItem display={'flex'} justifyContent={'end'}>
              <Button type='submit' label='Avanti' isLoading={!!loading} />
            </GridItem>
          </Grid>
        </form>
      </FormProvider>
      {renderCropModal()}
    </Stack>
  );
};

export default PersonaleStep;
