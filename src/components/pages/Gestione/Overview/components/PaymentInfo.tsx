import PaymentBox from '@/components/Payments/PaymentBox';
import { PaymentProps } from '@/core/types/payments';
import { Box, Heading, Stack } from '@chakra-ui/react';

type PaymentInfo = {
  payment?: PaymentProps;
};

const PaymentInfo = ({ payment }: PaymentInfo) => {
  return (
    <Box flex={1}>
      <Heading as={'h4'} variant={'h4'} mt={4}>
        Informazioni di pagamento
      </Heading>
      <Stack borderColor={'esea.gray'} rounded={'2xl'}>
        <PaymentBox payment={payment} />
      </Stack>
    </Box>
  );
};

export default PaymentInfo;
