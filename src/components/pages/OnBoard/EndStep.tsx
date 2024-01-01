import Button from '@/kit/Button/Button';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';

type EndStepProps = {
  onStart: () => void;
};

const EndStep = ({ onStart }: EndStepProps) => {
  return (
    <Stack
      w={'container.lg'}
      mx={'auto'}
      textAlign={'center'}
      justifyContent={'center'}
      minH={400}
    >
      <Heading variant={'h2'}>
        Tutto pronto! Adesso non ti resta altro che iniziare
      </Heading>
      <Text>
        Hai appena terminato la fase di onboarding adesso sei pronto per
        usufruire di Esea.app! Troverai le informazioni che hai appena inserito
        nella sezione &apos;Gestione&apos; dell&apos;area privata. Portai
        modificare queste informazioni in qualsiasi momento
      </Text>
      <Box mt={6}>
        <Button label='Vai al gestionale' onClick={onStart} />
      </Box>
    </Stack>
  );
};

export default EndStep;
