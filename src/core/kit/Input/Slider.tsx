import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderProps as ChakraSliderProps,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

type SliderProps = { label?: string } & Pick<
  ChakraSliderProps,
  | 'onChange'
  | 'defaultValue'
  | 'value'
  | 'colorScheme'
  | 'aria-label'
  | 'min'
  | 'max'
  | 'step'
>;

const Slider = ({ label, ...restProps }: SliderProps) => (
  <>
    {label ? (
      <Text fontWeight={600} fontSize={{ base: 'md', md: 'xl' }}>
        {label}
      </Text>
    ) : null}
    <ChakraSlider {...restProps}>
      <SliderTrack>
        <SliderFilledTrack bg={'esea.blue'} />
      </SliderTrack>
      <SliderThumb />
    </ChakraSlider>
  </>
);

export default Slider;
