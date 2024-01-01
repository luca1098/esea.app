import Button from '@/kit/Button/Button';
import { Flex, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { InfoAziendaFormProps } from './schemas';
import AvatarUploaderField from '@/kit/Input/AvatarUploaderField';
import InputField from '@/kit/Input/InputField';
import { useCroppedImage } from '@/core/hooks/useCroppedImage';
import { InfoAziendaFormCustomResolver } from './resolvers';
import { PictureIcon } from '@/kit/Icons/icons';

type AziendaStepProps = {
  loading?: boolean;
  onNext: (values: InfoAziendaFormProps) => void;
  onPrev: () => void;
};

const AziendaStep = ({ loading, onNext, onPrev }: AziendaStepProps) => {
  const methods = useForm<InfoAziendaFormProps>({
    resolver: InfoAziendaFormCustomResolver,
  });

  const { renderCropModal, croppedImg, clearImageField } = useCroppedImage(
    methods,
    'logo',
  );

  return (
    <Stack w={'container.lg'} mx={'auto'}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onNext)}>
          <Stack
            borderWidth={1}
            rounded={'2xl'}
            p={6}
            mb={6}
            alignItems={'center'}
          >
            <Flex alignItems={'center'} gap={4} direction={'column'}>
              <AvatarUploaderField
                name='logo'
                preview={croppedImg}
                size={'2xl'}
                icon={<PictureIcon />}
              />
              {croppedImg ? (
                <Button
                  label='Rimuovi immagine'
                  onClick={clearImageField}
                  variant='outline'
                />
              ) : null}
            </Flex>
            <InputField label='Nome azienda' name='name' />
          </Stack>
          <Flex justifyContent={'space-between'}>
            <Button
              onClick={onPrev}
              variant='link'
              label='Indietro'
              disabled={!!loading}
            />
            <Button type='submit' label='Avanti' isLoading={!!loading} />
          </Flex>
        </form>
      </FormProvider>
      {renderCropModal()}
    </Stack>
  );
};

export default AziendaStep;
