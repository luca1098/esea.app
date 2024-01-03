import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormInserisciBarca } from './schemas';
import Button from '@/kit/Button/Button';
import { Box, Stack } from '@chakra-ui/react';
import { PropsWithUser } from '@/core/types/user';
import { navigation } from '@/core/config/navigation';
import { useAddBoat } from '../queries';
import { uploadImage } from '@/core/services/uploadImage';
import { useState } from 'react';
import useResponseToast from '@/core/hooks/useResponseToast';
import BaseInfoFields from './components/BaseInfoFields';
import ServicesFields from './components/ServicesFields';
import { FormInserisciBarcaCustomResolver } from './resolver';
import { uniqueId } from 'lodash';

const InserisciForm = ({ user }: PropsWithUser) => {
  const [fileUploadLoading, setFileUploadLoading] = useState<boolean>(false);
  const { errorToast, successToast } = useResponseToast();
  const router = useRouter();
  const methods = useForm<FormInserisciBarca>({
    resolver: FormInserisciBarcaCustomResolver,
    defaultValues: {
      services: [{ label: '', price: 0, id: uniqueId('service') }],
    },
  });

  const [addBoat, { loading }] = useAddBoat(user?.companyId ?? '');

  const onSubmit = async (values: FormInserisciBarca) => {
    setFileUploadLoading(true);
    const { path } = await uploadImage(
      values.image,
      `${user?.companyId}/boats`,
    );
    setFileUploadLoading(false);

    const args = {
      name: values.name,
      image: path,
      companyId: user?.companyId || '',
      maxPeople: Number(values.maxPeople),
      services: values.services,
    };

    const { data, errors } = await addBoat({
      variables: {
        ...args,
      },
    });

    if (errors || !data?.addBoat?.valido) {
      errorToast(errors, data?.addBoat);
    } else {
      successToast(data?.addBoat);
      methods.reset({});
      router.push(navigation.private.gestione.barche.index);
    }
  };

  return (
    <Box flex={2}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <BaseInfoFields methods={methods} />
          <ServicesFields methods={methods} />
          {/* <GridItem colSpan={2}>TODO:section calendar</GridItem>*/}
          <Stack borderTopWidth={1} mt={6} p={4} alignItems={'end'}>
            <Button
              label='Inserisci'
              type='submit'
              isLoading={loading || fileUploadLoading}
            />
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default InserisciForm;
