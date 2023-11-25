import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import ContentBox from '@/kit/Box/ContentBox';
import FileUploader from '@/kit/Input/FileUploader';
import { FormInserisciBarca, FormInserisciBarcaSchema } from '../schemas';
import InputField from '@/kit/Input/InputField';
import Button from '@/kit/Button/Button';
import { Grid, GridItem, useToast } from '@chakra-ui/react';
import { PropsWithUser } from '@/core/shared/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { navigation } from '@/core/config/navigation';
import { useAddBoat } from '../queries';

const InserisciForm = ({ user }: PropsWithUser) => {
  const toast = useToast();
  const router = useRouter();
  const methods = useForm<FormInserisciBarca>({
    resolver: zodResolver(FormInserisciBarcaSchema),
  });
  const [addbBoat, { loading }] = useAddBoat({ email: user?.email || '' });

  const onSubmit = async (values: FormInserisciBarca) => {
    const { data, errors } = await addbBoat({
      variables: {
        args: {
          name: values.name,
          userId: user?.id || '',
          maxPeople: Number(values.maxPeople),
          image:
            'https://www.unavitavistamare.com/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FOVR10jQXSze4HwfTVUFA&w=3840&q=75',
        },
      },
    });

    if (errors || data?.boat?.error) {
      toast({
        title: 'Errore',
        description: data?.boat?.message,
        status: 'error',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Successo',
        description: data?.boat?.message,
        status: 'success',
        isClosable: true,
      });
      methods.reset({});
      router.push(navigation.private.gestione.barche.index);
    }
  };

  return (
    <ContentBox>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid templateColumns='repeat(2, 1fr)' gap={6} mb={6}>
            <GridItem colSpan={2}>
              <FileUploader />
            </GridItem>
            <GridItem>
              <InputField name='name' label='Nome della barca' />
            </GridItem>
            <GridItem>
              <InputField name='maxPeople' label='Massimo persone' />
            </GridItem>
          </Grid>
          <Button label='Inserisci' type='submit' isLoading={loading} />
        </form>
      </FormProvider>
    </ContentBox>
  );
};

export default InserisciForm;
