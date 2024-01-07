import { BoatProps } from '@/core/types/barca';
import { PictureIcon } from '@/kit/Icons/icons';
import { Grid, GridItem, Heading } from '@chakra-ui/react';
import ServicesDetails from './components/ServicesDetails';
import ServicesFields from '../components/ServicesFields';
import { UseFormReturn } from 'react-hook-form';
import { FormInserisciBarca } from '../schemas';
import PeopleDetails from './components/PeopleDetails';
import NumberInputField from '@/kit/Input/NumberInputField';
import InputField from '@/kit/Input/InputField';
import { useCroppedImage } from '@/core/hooks/useCroppedImage';
import AvatarUploaderField from '@/kit/Input/AvatarUploaderField';

type BoatDetailsProps = {
  boat: BoatProps;
  isEditing: boolean;
  methods: UseFormReturn<FormInserisciBarca>;
};

const BoatDetails = ({ boat, methods, isEditing }: BoatDetailsProps) => {
  const { croppedImg, renderCropModal } = useCroppedImage(methods);

  return (
    <>
      <Grid templateColumns={'repeat(2,1fr)'} rowGap={4}>
        <GridItem colSpan={2} p={6} rounded={'2xl'} bg={'esea.gray'}>
          <AvatarUploaderField
            name='image'
            icon={<PictureIcon />}
            size={'5xl'}
            preview={isEditing && croppedImg ? croppedImg : boat?.image}
            disableUpload={!isEditing}
          />
        </GridItem>
        <GridItem colSpan={2}>
          {isEditing ? (
            <InputField name='name' label='Nome' />
          ) : (
            <Heading variant={'h2'}>{boat?.name} </Heading>
          )}
        </GridItem>
        <GridItem colSpan={2}>
          {isEditing ? (
            <NumberInputField name='maxPeople' label='Persone' />
          ) : (
            <PeopleDetails maxPeople={boat?.maxPeople} />
          )}
        </GridItem>
        <GridItem colSpan={2}>
          {isEditing ? (
            <ServicesFields methods={methods} hideServiziPiuUsati />
          ) : (
            <ServicesDetails services={boat?.services} />
          )}
        </GridItem>
      </Grid>
      {renderCropModal()}
    </>
  );
};

export default BoatDetails;
