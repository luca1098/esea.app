import { Children, ReactElement, useMemo } from 'react';
import Stepper, { StepperProps } from './Stepper';
import { Box } from '@chakra-ui/react';

type WizzardStepperProps = {
  activeStep: number;
  showStepper?: boolean;
  stepperWidth?: StepperProps['width'];
  titlesKeys?: string[];
  children: ReactElement[];
  stepsInfo: StepperProps['steps'];
};

const WizzardStepper = ({
  stepsInfo,
  activeStep,
  children,
  stepperWidth = 'container.md',
}: WizzardStepperProps) => {
  const steps = useMemo(() => {
    return Children.map(children, (child, idx) => {
      const step = stepsInfo[idx];
      return {
        title: step.title,
        description: step.description,
        component: child,
      };
    });
  }, [children, stepsInfo]);

  return (
    <>
      <Stepper activeStep={activeStep} width={stepperWidth} steps={steps} />
      <Box mt={3}>{steps?.[activeStep].component}</Box>
    </>
  );
};

export default WizzardStepper;
