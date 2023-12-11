import {
  ComponentMultiStyleConfig,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';
import { inputBaseStyle, inputVariants, outlineFieldStyle } from './input';

const helpers = createMultiStyleConfigHelpers(['field', 'icon']);

const baseStyle: ComponentMultiStyleConfig['baseStyle'] =
  helpers.definePartsStyle({
    ...inputBaseStyle,
    icon: {
      color: 'vita.primary',
    },
  });
const leftAddon = helpers.definePartsStyle({
  field: {
    ...outlineFieldStyle,
    borderRightRadius: '0',
    bgColor: 'transparent',
  },
});

export const select: ComponentMultiStyleConfig = helpers.defineMultiStyleConfig(
  {
    variants: { ...inputVariants, leftAddon },
    baseStyle,
  },
);
