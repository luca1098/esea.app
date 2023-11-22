import {
  ComponentSingleStyleConfig,
  defineStyle,
  defineStyleConfig,
} from '@chakra-ui/react';
import { breakpoint } from '../utils';

const sizes: ComponentSingleStyleConfig['sizes'] = {
  md: defineStyle({
    maxW: {
      base: '100%',
      md: breakpoint['md'],
      lg: breakpoint['lg'],
      xl: breakpoint['xl'],
    },
  }),
};
const defaultProps: ComponentSingleStyleConfig['defaultProps'] = {
  size: 'md',
};
export const container: ComponentSingleStyleConfig = defineStyleConfig({
  sizes,
  defaultProps,
});
