import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormInserisciBarca } from './schemas';
import Button from '@/kit/Button/Button';
import { Box, Grid, GridItem, Stack } from '@chakra-ui/react';
import { PropsWithUser } from '@/core/types/user';
import { navigation } from '@/core/config/navigation';
import { useAddBoat } from '../queries';
import { uploadImage } from '@/core/services/uploadImage';
import { useState } from 'react';
import useResponseToast from '@/core/hooks/useResponseToast';
import BaseInfoFields from './components/BaseInfoFields';
import ServicesFields from './components/ServicesFields';
import { FormInserisciBarcaCustomResolver } from './resolver';
import CalendarBoat from './components/CalendarBoat';

const InserisciForm = ({ user }: PropsWithUser) => {
  const [fileUploadLoading, setFileUploadLoading] = useState<boolean>(false);
  const { errorToast, successToast } = useResponseToast();
  const router = useRouter();
  const methods = useForm<FormInserisciBarca>({
    resolver: FormInserisciBarcaCustomResolver,
    defaultValues: {
      services: [
        {
          label: '',
          durations: [
            {
              label: 'Intera giornata',
              price: 0,
            },
          ],
        },
      ],
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

    // rimuovo gli id dai servizi e li faccio creare da Prisma in modo da non avere servizi con id duplicati
    const servicesWithoutId = (values?.services || []).map(
      ({ id, ...rest }) => ({ ...rest }),
    );

    const args = {
      name: values.name,
      image: path,
      companyId: user?.companyId || '',
      maxPeople: Number(values.maxPeople),
      services: servicesWithoutId,
      unaviableSlots: values.unavailableSlots,
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
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={6}
          >
            <GridItem colSpan={2}>
              <BaseInfoFields methods={methods} />
              <ServicesFields methods={methods} />
            </GridItem>
            <GridItem colSpan={1}>
              <CalendarBoat methods={methods} />
            </GridItem>
          </Grid>

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
