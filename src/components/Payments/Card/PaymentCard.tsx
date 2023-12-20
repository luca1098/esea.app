import { CardType, PaymentProps } from '@/core/types/payments';
import {
  creditCardBlurred,
  creditCardFormat,
  creditCardType,
} from '@/core/utils/payments';
import { Stack, Text } from '@chakra-ui/react';
import AMEX_LOGO from '@/assets/payment/amex.png';
import CHINA_UNION_PAY_LOGO from '@/assets/payment/china_union_pay.png';
import DISCOVER_LOGO from '@/assets/payment/discover.png';
import MASTERCARD_LOGO from '@/assets/payment/mastercard.png';
import VISA_LOGO from '@/assets/payment/visa.png';
import JCB_LOGO from '@/assets/payment/jcb.png';
import DINERS_LOGO from '@/assets/payment/diners.svg';
import { StaticImageData } from 'next/image';
import Image from '@/kit/Image/Image';

type LogoConfigProps = {
  logo: StaticImageData;
  bgGradient: string;
};

const logoConfig: Record<CardType, LogoConfigProps> = {
  MASTERCARD: {
    logo: MASTERCARD_LOGO,
    bgGradient: 'linear(to-r, blue.400,cyan.200)',
  },
  CHINA_UNION_PAY: {
    logo: CHINA_UNION_PAY_LOGO,
    bgGradient: 'linear(to-r, purple.200, pink.100)',
  },
  AMEX: {
    logo: AMEX_LOGO,
    bgGradient: 'linear(to-r, orange.300,yellow.100)',
  },
  DISCOVER: {
    logo: DISCOVER_LOGO,
    bgGradient: 'linear(to-r, green.300, cyan.200)',
  },
  VISA: {
    logo: VISA_LOGO,
    bgGradient: 'linear(to-r, blue.400,cyan.200)',
  },
  JCB: {
    logo: JCB_LOGO,
    bgGradient: 'linear(to-r, pink.300, blue.200)',
  },
  DINERS: {
    logo: DINERS_LOGO,
    bgGradient: 'linear(to-r, cyan.200, blue.100)',
  },
};

type PaymentCardProps = Pick<
  PaymentProps,
  'cardNumber' | 'cardHolder' | 'expireDate'
>;

const PaymentCard = ({
  cardNumber,
  cardHolder,
  expireDate,
}: PaymentCardProps) => {
  const cardType = creditCardType(cardNumber);

  const blurredCardNumber = creditCardBlurred(creditCardFormat(cardNumber));

  return (
    <Stack
      h={'150px'}
      w={'250px'}
      borderWidth={2}
      borderColor={'esea.gray'}
      rounded={'xl'}
      bgGradient={
        cardType
          ? logoConfig[cardType]?.bgGradient
          : 'linear(to-r, green.200, gray.100)'
      }
      position={'relative'}
      p={4}
      justifyContent={'center'}
    >
      <Text
        fontWeight={'medium'}
        fontSize={'xs'}
        position={'absolute'}
        top={4}
        right={4}
      >
        {expireDate}
      </Text>
      <Text fontWeight={'medium'} letterSpacing={1.4}>
        {blurredCardNumber}
      </Text>
      <Text
        fontWeight={'medium'}
        fontSize={'sm'}
        position={'absolute'}
        bottom={4}
        left={4}
        lineHeight={'.9'}
      >
        {cardHolder}
      </Text>
      {cardType ? (
        <Image
          src={logoConfig[cardType].logo}
          alt=''
          w={'auto'}
          h={'35px'}
          position={'absolute'}
          bottom={4}
          right={4}
        />
      ) : null}
    </Stack>
  );
};

export default PaymentCard;
