import AziendaStep from '@/components/pages/OnBoard/AziendaStep';
import EndStep from '@/components/pages/OnBoard/EndStep';
import PersonaleStep from '@/components/pages/OnBoard/PersonaleStep';
import { useCreateCompany } from '@/components/pages/OnBoard/queries';
import {
  AddInfoPersonaliArgsProps,
  InfoAziendaFormProps,
  InfoPersonaliFormProps,
} from '@/components/pages/OnBoard/schemas';
import { useEditUser } from '@/components/pages/shared/queries';
import useResponseToast from '@/core/hooks/useResponseToast';
import { uploadImage } from '@/core/services/uploadImage';
import { PropsWithUser } from '@/core/types/user';
import WizzardStepper from '@/kit/Stepper/WizardStepper';
import { Heading, Stack, Text, useSteps } from '@chakra-ui/react';
import { GetSessionParams, getSession } from 'next-auth/react';
import React, { useState } from 'react';

const steps = [
  { title: 'Uno', description: 'Informazioni personali' },
  { title: 'Due', description: 'Informazioni Azienda' },
  { title: 'Tre', description: 'Ci siamo!' },
];

type OnBoardingProps = PropsWithUser;

const OnBoarding = ({ user }: OnBoardingProps) => {
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });
  const { successToast, errorToast } = useResponseToast();

  const [editUser, { loading: editUserLoading }] = useEditUser();
  const [createCompany, { loading: createCompanyLoading }] = useCreateCompany();

  const handleUplodImage = async (image: File) => {
    setUploadLoading(true);
    try {
      const { path } = await uploadImage(image, `${user?.companyId}/profilo`);
      setUploadLoading(false);
      return path;
    } catch (e) {
      errorToast([], {
        valido: false,
        message: "L'immagine non è stata caricata con successo",
      });
      setUploadLoading(false);
      return null;
    }
  };

  const handleInfoPersonaliNext = async (values: InfoPersonaliFormProps) => {
    let url = null;
    if (values.image) {
      url = await handleUplodImage(values.image);
    }
    if (!user?.email) {
      errorToast([], {
        valido: false,
        message: "Errore durante il caricamento dell'utente",
      });
      return null;
    }
    const args: AddInfoPersonaliArgsProps = {
      email: user?.email ?? '',
      phone: values.phone,
      dataNascita: values.dataNascita,
      codFisc: values.codFisc,
      image: url,
    };

    const { data, errors } = await editUser({
      variables: {
        args,
      },
    });

    if (errors || !data.editUser.valido) {
      errorToast(errors, data.editUser);
    } else {
      successToast(data.editUser);
      goToNext();
    }
    return null;
  };

  const handleInfoAziendaNext = async (values: InfoAziendaFormProps) => {
    let logo = null;
    if (values.logo) {
      logo = await handleUplodImage(values.logo);
    }
    const { data, errors } = await createCompany({
      variables: {
        name: values.name,
        logo,
      },
    });
    if (errors || !data.createCompany.valido) {
      errorToast(errors, data.createCompany);
    } else {
      successToast(data.createCompany);
      const { id: companyId } = data?.createCompany || {};
      const { data: editUserRes, errors: editUserErrors } = await editUser({
        variables: {
          args: {
            email: user?.email,
            companyId,
          },
        },
      });

      if (editUserErrors || !editUserRes.editUser.valido) {
        errorToast(editUserErrors, editUserRes.editUser);
      } else {
        successToast({
          valido: true,
          message: "Utente associato con successo all'azienda creata",
        });
        goToNext();
      }
    }
  };

  const handleStart = () => {
    // goToNext();
  };

  return (
    <Stack p={8} alignItems={'center'}>
      <Heading as={'h1'} variant={'h1'}>
        Benvenuto a bordo {'nome'}!
      </Heading>
      <Text>
        Sarebbe grandioso se ci fornissi le informazioni necessarie per darci la
        possibilità di far gestire e far crescere la tua azienda!
      </Text>
      <WizzardStepper activeStep={activeStep} stepsInfo={steps}>
        <PersonaleStep
          onNext={handleInfoPersonaliNext}
          loading={uploadLoading || editUserLoading}
        />
        <AziendaStep
          onNext={handleInfoAziendaNext}
          onPrev={goToPrevious}
          loading={uploadLoading || createCompanyLoading || editUserLoading}
        />
        <EndStep onStart={handleStart} />
      </WizzardStepper>
    </Stack>
  );
};

export default OnBoarding;

export const getServerSideProps = async (ctx: GetSessionParams) => {
  const session = await getSession(ctx);
  if (session) {
    return {
      props: {
        user: session.user,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/sign-in',
    },
  };
};
