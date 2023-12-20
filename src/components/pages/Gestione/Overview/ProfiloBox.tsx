import { UserExtended } from '@/core/types/user';
import ContentBox from '@/kit/Box/ContentBox';
import { Divider, Heading, Stack } from '@chakra-ui/react';
import PaymentInfo from './components/PaymentInfo';
import PersonalInfo from './components/PersonalInfo';

type ProfiloBoxProps = {
  user?: UserExtended;
};

const ProfiloBox = ({ user }: ProfiloBoxProps) => {
  return (
    <ContentBox h={'full'}>
      <Heading as={'h3'} variant={'h3'}>
        Profilo
      </Heading>
      <Divider mb={4} />
      <Stack direction={{ lg: 'row' }}>
        <PersonalInfo user={user} />
        <PaymentInfo payment={user?.payment} />
      </Stack>
    </ContentBox>
  );
};

export default ProfiloBox;
