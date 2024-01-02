import {
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper as ChakraStepper,
  StepperProps as ChakraStepperProps,
  Text,
  Box,
} from '@chakra-ui/react';

type StepProps = {
  title: string;
  description?: string;
};
export type StepperProps = {
  steps: StepProps[];
  activeStep: number;
} & Pick<ChakraStepperProps, 'width'>;

const Stepper = ({ steps, activeStep, width }: StepperProps) => {
  const activeStepText = steps[activeStep].description;
  return (
    <Stack w={width}>
      <ChakraStepper size='sm' index={activeStep} gap='0'>
        {steps.map((step, index) => (
          <Box as={Step} key={index} gap='0'>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} />
            </StepIndicator>
            <Box as={StepSeparator} _horizontal={{ m: '0' }} p={'3px'} />
          </Box>
        ))}
      </ChakraStepper>
      <Text>
        Step {activeStep + 1}: <b>{activeStepText}</b>
      </Text>
    </Stack>
  );
};

export default Stepper;
