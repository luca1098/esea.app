import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormInserisciBarca, FormInserisciBarcaSchema } from './schemas';
import InputField from '@/kit/Input/InputField';
import Button from '@/kit/Button/Button';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { PropsWithUser } from '@/core/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { navigation } from '@/core/config/navigation';
import { useAddBoat } from '../queries';
import { uploadImage } from '@/core/services/uploadImage';
import { useState } from 'react';
import FileUploaderField from '@/kit/Input/FileUploaderField';
import useResponseToast from '@/core/hooks/useResponseToast';

const InserisciForm = ({ user }: PropsWithUser) => {
  const [fileUploadLoading, setFileUploadLoading] = useState<boolean>(false);
  const { errorToast, successToast } = useResponseToast();
  const router = useRouter();
  const methods = useForm<FormInserisciBarca>({
    resolver: zodResolver(FormInserisciBarcaSchema),
  });

  const [addBoat, { loading }] = useAddBoat(user?.companyId ?? '');

  const onSubmit = async (values: FormInserisciBarca) => {
    setFileUploadLoading(true);
    const { path } = await uploadImage(
      values.image,
      `${user?.companyId}/boats`,
    );
    setFileUploadLoading(false);
    const { data, errors } = await addBoat({
      variables: {
        args: {
          name: values.name,
          image: path,
          companyId: user?.companyId || '',
          maxPeople: Number(values.maxPeople),
        },
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
          <Grid templateColumns='repeat(2, 1fr)' gap={6} mb={6}>
            <GridItem colSpan={2}>
              <FileUploaderField name='image' maxFiles={1} maxSize={1} />
            </GridItem>
            <GridItem>
              <InputField name='name' label='Nome della barca' />
            </GridItem>
            <GridItem>
              <InputField name='maxPeople' label='Massimo persone' />
            </GridItem>
            <GridItem colSpan={2}>TODO:section calendar</GridItem>
            <GridItem colSpan={2}>TODO:section services</GridItem>
          </Grid>
          <Button
            label='Inserisci'
            type='submit'
            isLoading={loading || fileUploadLoading}
          />
        </form>
      </FormProvider>
    </Box>
  );
};

export default InserisciForm;
