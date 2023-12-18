import { UserExtended } from '@/core/types/user';
import ContentBox from '@/kit/Box/ContentBox';
import { Divider, Heading, Text } from '@chakra-ui/react';
import ValueWithLabel from '../components/ValueWithLabel';
import { formatDate } from '@/core/utils/date';

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
      <ValueWithLabel label='Nome' value={user?.name} />
      <ValueWithLabel
        label='Data di nascita'
        value={formatDate(user?.birthday)}
      />
      <ValueWithLabel label='Email' value={user?.email} />
      <ValueWithLabel label='Cellulare' value={user?.cellulare} />

      <Text>{'metodo di pagamento'}</Text>
      <Text>{'numero carta'}</Text>
      <Heading as={'h4'} variant={'h4'} mt={4}>
        Piano tariffario
      </Heading>
    </ContentBox>
  );
};

export default ProfiloBox;
