import ContentBox from '@/kit/Box/ContentBox';
import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import DefoultLogo from '@/assets/company-placeholder.svg';
import { CompanyProps } from '@/core/shared/types/company';
import EmptyBox from '@/components/Empty/EmptyBox';
import ValueWithLabel from '../components/ValueWithLabel';

type AziendaBox = {
  company: CompanyProps;
};

const AziendaBox = ({ company }: AziendaBox) => {
  return (
    <ContentBox h={'full'}>
      <Heading as={'h3'} variant={'h3'}>
        Azienda
      </Heading>
      <Divider mb={4} />
      <Stack gap={4}>
        <Flex gap={4} align={'center'}>
          <Box
            position={'relative'}
            w={100}
            h={100}
            rounded={'2xl'}
            overflow={'hidden'}
          >
            <Image
              src={DefoultLogo}
              fill
              alt={`${company?.name} logo`}
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Box>
            <Text fontWeight={'bold'}>{company.name}</Text>
            <ValueWithLabel label='Proprietario' value={company.name} />
          </Box>
        </Flex>
        <Box>
          <Text fontWeight={'medium'}>Barche</Text>
          <AvatarGroup size='md' max={3}>
            {company?.boats.length > 0 ? (
              company.boats.map((b) => (
                <Avatar key={b.id} src={b.image} name={b.name} />
              ))
            ) : (
              <EmptyBox msg='Ancora nessuna barca presente' />
            )}
          </AvatarGroup>
        </Box>
        <Box>
          <Text fontWeight={'medium'}>Personale</Text>
          <AvatarGroup size='md' max={3}>
            {company?.employees.length > 0 ? (
              company.employees?.map((e) => (
                <Avatar key={e.id} src={e.image ?? ''} name={e.name} />
              ))
            ) : (
              <EmptyBox msg='Ancora nessuna personale presente' />
            )}
          </AvatarGroup>
        </Box>
      </Stack>
    </ContentBox>
  );
};

export default AziendaBox;
