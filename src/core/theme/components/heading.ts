import {
  ComponentSingleStyleConfig,
  defineStyle,
  defineStyleConfig,
} from '@chakra-ui/react';

const h1 = defineStyle({
  lineHeight: 1,
  fontSize: '4xl',
  mb: 4,
});
const h2 = defineStyle({
  lineHeight: 1,
  fontSize: '2xl',
  mb: 4,
});
const h3 = defineStyle({
  fontSize: 'xl',
  mb: 4,
});
const h4 = defineStyle({
  fontSize: 'md',
  mb: 4,
});
const h5 = defineStyle({
  fontSize: 'sm',
  mb: 4,
});

const variants: ComponentSingleStyleConfig['variants'] = defineStyle({
  h1,
  h2,
  h3,
  h4,
  h5,
});
const baseStyle: ComponentSingleStyleConfig['baseStyle'] = defineStyle({
  color: 'black',
});

export const heading: ComponentSingleStyleConfig = defineStyleConfig({
  variants,
  baseStyle,
});
