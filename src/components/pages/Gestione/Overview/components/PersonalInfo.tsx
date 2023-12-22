import { UserExtended } from '@/core/types/user';
import { formatDate } from '@/core/utils/date';
import { Box, Heading } from '@chakra-ui/react';
import ValueWithLabel from '../../components/ValueWithLabel';
import EmptyBox from '@/components/Empty/EmptyBox';
import { planConfig } from '@/components/User/utils';
import { formatCurrency } from '@/core/utils/currencies';

type PersonalInfoProps = {
  user?: UserExtended;
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
        value={formatDate(user?.birthday)}
      />
      <ValueWithLabel label='Email' value={user?.email} />
      <ValueWithLabel label='Cellulare' value={user?.cellulare} />
      <Heading as={'h4'} variant={'h4'} mt={4}>
        Piano
      </Heading>
      <ValueWithLabel
        label='Piano attuale'
        value={user?.plan?.plan ? planConfig[user?.plan?.plan]?.label : '-'}
      />
      <ValueWithLabel
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
      />
    </Box>
  );
};

export default PersonalInfo;
