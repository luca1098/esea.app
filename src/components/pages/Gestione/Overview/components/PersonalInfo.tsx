import { Box, Heading } from '@chakra-ui/react';
import ValueWithLabel from '../../components/ValueWithLabel';
import EmptyBox from '@/components/Empty/EmptyBox';
import { planConfig } from '@/components/User/utils';
import { Session } from 'next-auth';
import { formatDate } from '@/core/utils/date';

type PersonalInfoProps = {
  user?: Session['user'];
};
const PersonalInfo = ({ user }: PersonalInfoProps) => {
  if (!user) return <EmptyBox msg='Nessuna informazione disponibile' />;

  return (
    <Box flex={1}>
      <Heading as={'h4'} variant={'h4'} mt={4}>
        Informazioni Personali
      </Heading>
      <ValueWithLabel label='Nome' value={user?.name} />
      <ValueWithLabel
        label='Data di nascita'
        value={formatDate(user?.dataNascita) || '-'}
      />
      <ValueWithLabel label='Email' value={user?.email} />
      <ValueWithLabel label='Cellulare' value={user?.phone} />
      <Heading as={'h4'} variant={'h4'} mt={4}>
        Piano
      </Heading>
      <ValueWithLabel
        label='Piano attuale'
        value={true ? planConfig['BASE']?.label : '-'} //TODO
      />
      {/* <ValueWithLabel
        label='Data utilmo accredito'
        value={formatDate(user?.plan?.lastPaymentDate)}
      />
      <ValueWithLabel
        label='Data prossimo accredito'
        value={formatDate(user?.plan?.renewalDate)}
      />

      <ValueWithLabel
        label='Rata'
        value={formatCurrency(user?.plan?.amount) || '-'}
      /> */}
    </Box>
  );
};

export default PersonalInfo;
