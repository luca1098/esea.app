import ContentBox from '@/kit/Box/ContentBox';
import Table from '@/kit/Table/Table';
import { Divider, Heading } from '@chakra-ui/react';
import { AccreditoListProps } from './schemas';
import { columns } from './utils';

const fakeData: AccreditoListProps = [
  {
    id: 'asdasdqweqeqw',
    amount: 30,
    paymentDate: 1703081651000,
    method: 'CARD',
    status: 'SUCCESS',
  },
  {
    id: 'asdasdqweqeqw',
    amount: 30,
    paymentDate: 1700489651000,
    method: 'CARD',
    status: 'SUCCESS',
  },
  {
    id: 'asdasdqweqeqw',
    amount: 30,
    paymentDate: 1697811251000,
    method: 'CARD',
    status: 'ERROR',
  },
  {
    id: 'asdasdqweqeqw',
    amount: 30,
    paymentDate: 1695219251000,
    method: 'CARD',
    status: 'ERROR',
  },
  {
    id: 'asdasdqweqeqw',
    amount: 30,
    paymentDate: 1703081651000,
    method: 'CARD',
    status: 'SUCCESS',
  },
  {
    id: 'asdasdqweqeqw',
    amount: 30,
    paymentDate: 1700489651000,
    method: 'CARD',
    status: 'PENDING',
  },
  {
    id: 'asdasdqweqeqw',
    amount: 30,
    paymentDate: 1697811251000,
    method: 'CARD',
    status: 'PENDING',
  },
  {
    id: 'asdasdqweqeqw',
    amount: 30,
    paymentDate: 1695219251000,
    method: 'CARD',
    status: 'PENDING',
  },
  {
    id: 'asdasdqweqeqw',
    amount: 30,
    paymentDate: 1703081651000,
    method: 'CARD',
    status: 'PENDING',
  },
  {
    id: 'asdasdqweqeqw',
    amount: 30,
    paymentDate: 1700489651000,
    method: 'CARD',
    status: 'PENDING',
  },
  {
    id: 'asdasdqweqeqw',
    amount: 30,
    paymentDate: 1697811251000,
    method: 'CARD',
    status: 'PENDING',
  },
];

const UltimiAccreditiBox = () => {
  return (
    <ContentBox>
      <Heading as={'h3'} variant={'h3'}>
        Ultimi accrediti
      </Heading>
      <Divider mb={4} />
      <Table data={fakeData} columns={columns} />
    </ContentBox>
  );
};

export default UltimiAccreditiBox;
