import { PaymentProps } from '@/core/types/payments';
import PaymentCard from './Card/PaymentCard';
import { paymentMethodConfig } from './utils';
import ValueWithLabel from '../pages/Gestione/components/ValueWithLabel';
import { Box } from '@chakra-ui/react';
import Image from '@/kit/Image/Image';
import BTC_LOGO from '@/assets/payment/btc.png';
import PAYPAL_LOGO from '@/assets/payment/paypal.png';
import SATISPAY_LOGO from '@/assets/payment/satispay.png';
import EmptyBox from '../Empty/EmptyBox';

type PaymentBoxProps = {
  payment?: PaymentProps;
};

const PaymentBox = ({ payment }: PaymentBoxProps) => {
  const { method } = payment || {};
  if (method === 'CARD') return <CardPaymentComponent payment={payment} />;
  if (method === 'BITCOIN')
    return <BitcoinPaymentComponent payment={payment} />;
  if (method === 'PAYPAL') return <PaypalPaymentComponent payment={payment} />;
  if (method === 'SATISPAY')
    return <SatispayPaymentComponent payment={payment} />;
  if (method === 'NONE') return <NonePaymentComponent />;

  return <EmptyBox msg='Nessun metodo di pagamento' />;
};

export default PaymentBox;

const CardPaymentComponent = ({ payment }: PaymentBoxProps) => {
  return (
    <>
      <PaymentCard
        cardNumber={payment?.cardNumber}
        cardHolder={payment?.cardHolder}
        expireDate={payment?.expireDate}
      />
      <Box mt={3}>
        <ValueWithLabel
          label='Metodo'
          value={
            payment?.method ? paymentMethodConfig[payment?.method]?.label : ''
          }
        />
        <ValueWithLabel label='Proprietario' value={payment?.expireDate} />
        <ValueWithLabel label='Data Scadenza' value={payment?.expireDate} />
      </Box>
    </>
  );
};

const BitcoinPaymentComponent = ({ payment }: PaymentBoxProps) => {
  return (
    <>
      <Image src={BTC_LOGO} alt='Bitcoin' w={'100px'} h={'auto'} />
      <ValueWithLabel
        label='Metodo'
        value={
          payment?.method ? paymentMethodConfig[payment?.method]?.label : ''
        }
      />
    </>
  );
};

const PaypalPaymentComponent = ({ payment }: PaymentBoxProps) => {
  return (
    <>
      <Image src={PAYPAL_LOGO} alt='Paypal' w={'200px'} h={'auto'} />
      <ValueWithLabel
        label='Metodo'
        value={
          payment?.method ? paymentMethodConfig[payment?.method]?.label : ''
        }
      />
    </>
  );
};

const SatispayPaymentComponent = ({ payment }: PaymentBoxProps) => {
  return (
    <>
      <Image src={SATISPAY_LOGO} alt='Satispay' w={'200px'} h={'auto'} />
      <ValueWithLabel
        label='Metodo'
        value={
          payment?.method ? paymentMethodConfig[payment?.method]?.label : ''
        }
      />
    </>
  );
};

const NonePaymentComponent = ({ payment }: PaymentBoxProps) => {
  return <EmptyBox msg='Gratuito' />;
};
