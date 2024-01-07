import AllBoatEvents from '@/components/pages/Gestione/Barche/Detail/components/AllBoatEvents';
import BoatDetails from '@/components/pages/Gestione/Barche/Detail/BoatDetails';
import CalendarBoat from '@/components/pages/Gestione/Barche/components/CalendarBoat';
import NextEventBoat from '@/components/pages/Gestione/Barche/Detail/components/NextEventBoat';
import GestioneLayout from '@/components/pages/Gestione/GestioneLayout';
import {
  useCompany,
  useUnaviableSlots,
} from '@/components/pages/shared/queries';
import { navigation } from '@/core/config/navigation';
import { BoatProps } from '@/core/types/barca';
import { PropsWithUser } from '@/core/types/user';
import ContentBox from '@/kit/Box/ContentBox';
import BackButton from '@/kit/Button/BackButton';
import Button from '@/kit/Button/Button';
import { CheckIcon, EditIcon, TrashIcon } from '@/kit/Icons/icons';
import PageTitle from '@/kit/Text/PageTitle';
import { Grid, GridItem, Stack } from '@chakra-ui/react';
import { GetSessionParams, getSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInserisciBarca } from '@/components/pages/Gestione/Barche/schemas';

type DetailsParams = {
  id: string;
};

type DetailsProps = PropsWithUser;

const Details = ({ user }: DetailsProps) => {
  const router = useRouter();
  const { id } = useParams<DetailsParams>();
  const methods = useForm<FormInserisciBarca>();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data: company, loading: companyLoading } = useCompany(
    user?.companyId ?? '',
  );

  const boat: BoatProps = company?.boats.find((b: BoatProps) => b.id === id);

  const { data: unaviableSlots, loading: unaviableSlotLoading } =
    useUnaviableSlots(boat?.id ?? '');

  useEffect(() => {
    if (!boat) router?.push(navigation.private.gestione.barche.index);
    else {
    }
  }, [boat, router, methods]);

  useEffect(() => {
    if (unaviableSlots?.length)
      methods?.setValue('unavailableSlots', unaviableSlots);
  }, [unaviableSlots, methods]);

  const handleEditClick = () => {
    methods?.setValue('name', boat?.name);
    methods?.setValue('maxPeople', String(boat?.maxPeople));
    if (boat?.services?.length) {
      boat?.services?.forEach((s, i) => {
        methods?.setValue(`services.${i}.label`, s.label);
        s?.durations?.forEach((d, iDuration) => {
          methods?.setValue(
            `services.${i}.durations.${iDuration}.label`,
            d.label,
          );
          methods?.setValue(
            `services.${i}.durations.${iDuration}.price`,
            d.price,
          );
        });
      });
    }

    setIsEditing(true);
  };

  return (
    <GestioneLayout
      user={user}
      company={company}
      isCompanyLoading={companyLoading}
    >
      <PageTitle title='Dettaglio' endElement={<BackButton />} />
      <Grid templateColumns={'repeat(3, 1fr)'} gap={4}>
        <GridItem colSpan={2}>
          <ContentBox>
            <Stack
              alignItems={'center'}
              direction={'row'}
              mb={4}
              justifyContent={'flex-end'}
              gap={2}
            >
              <Button
                label='Elimina'
                leftIcon={<TrashIcon />}
                onClick={() => null}
                variant='action'
              />
              {isEditing ? (
                <Button
                  leftIcon={<CheckIcon />}
                  label='Fatto'
                  onClick={() => setIsEditing(false)}
                />
              ) : (
                <Button
                  label='Modifica'
                  leftIcon={<EditIcon />}
                  onClick={handleEditClick}
                  variant='action'
                />
              )}
            </Stack>
            <FormProvider {...methods}>
              <form>
                <BoatDetails
                  boat={boat}
                  methods={methods}
                  isEditing={isEditing}
                />
              </form>
            </FormProvider>
          </ContentBox>
        </GridItem>
        <GridItem>
          <Stack>
            <ContentBox>
              <NextEventBoat />
            </ContentBox>
            <ContentBox>
              <CalendarBoat
                methods={methods}
                isLoading={unaviableSlotLoading}
              />
            </ContentBox>
          </Stack>
        </GridItem>
        <GridItem colSpan={3}>
          <ContentBox>
            <AllBoatEvents events={[]} isLoading={false} />
          </ContentBox>
        </GridItem>
      </Grid>
    </GestioneLayout>
  );
};

export default Details;

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
