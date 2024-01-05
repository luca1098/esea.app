import { useCroppedImage } from '@/core/hooks/useCroppedImage';
import AvatarUploaderField from '@/kit/Input/AvatarUploaderField';
import InputField from '@/kit/Input/InputField';
import { Flex, Grid, GridItem, Icon } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import { FormInserisciBarca } from '../schemas';
import Button from '@/kit/Button/Button';
import { PictureIcon } from '@/kit/Icons/icons';
import NumberInputField from '@/kit/Input/NumberInputField';

type BaseInfoFieldsProps = {
  methods: UseFormReturn<FormInserisciBarca>;
};

const BaseInfoFields = ({ methods }: BaseInfoFieldsProps) => {
  const { croppedImg, clearImageField, renderCropModal } =
    useCroppedImage(methods);
  return (
    <>
      <Grid templateColumns='repeat(2, 1fr)' gap={6} mb={6}>
        <GridItem colSpan={2}>
          <Flex
            rounded={'2xl'}
            bg={'esea.gray'}
            alignItems={{ base: 'center', lg: 'end' }}
            gap={4}
            p={6}
            direction={{ base: 'column', lg: 'row' }}
          >
            <AvatarUploaderField
              name='image'
              preview={croppedImg}
              size={'4xl'}
              icon={<Icon as={PictureIcon} fontSize={'9xl'} />}
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
          <InputField name='name' label='Nome della barca' />
        </GridItem>
        <GridItem>
          <NumberInputField name='maxPeople' label='Massimo persone' />
        </GridItem>
      </Grid>
      {renderCropModal()}
    </>
  );
};

export default BaseInfoFields;
