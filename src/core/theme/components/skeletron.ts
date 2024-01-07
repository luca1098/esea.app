import {
  ComponentSingleStyleConfig,
  defineStyle,
  defineStyleConfig,
} from '@chakra-ui/react';

const baseStyle: ComponentSingleStyleConfig['baseStyle'] = defineStyle({
  borderRadius: '2xl',
});

export const skeleton = defineStyleConfig({
  baseStyle,
});
