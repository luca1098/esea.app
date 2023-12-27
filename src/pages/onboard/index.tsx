import Button from '@/kit/Button/Button';
import WizzardStepper from '@/kit/Stepper/WizardStepper';
import { Heading, Stack, Text, useSteps } from '@chakra-ui/react';
import React from 'react';

const steps = [
  { title: 'Uno', description: 'Informazioni personali' },
  { title: 'Due', description: 'Informazioni Azienda' },
  { title: 'Tre', description: 'Inizia!' },
];

const OnBoarding = () => {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });
  return (
    <Stack p={8} alignItems={'center'}>
      <Heading as={'h1'} variant={'h1'}>
        Benvenuto a bordo {'nome'}!
      </Heading>
      <Text>
        Sarebbe grandioso se ci fornissi le informazioni necessarie per darci la
        possibilità di far gestire e far crescere la tua azienda!
      </Text>
      <WizzardStepper activeStep={activeStep} stepsInfo={steps}>
        <Text>1</Text>
        <Text>2</Text>
        <Text>3</Text>
      </WizzardStepper>
      <Button label='prev' onClick={goToPrevious} />
      <Button label='Next' onClick={goToNext} />
    </Stack>
  );
};

export default OnBoarding;
