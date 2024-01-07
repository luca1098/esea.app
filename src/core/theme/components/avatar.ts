import {
  ComponentMultiStyleConfig,
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers([
  'container',
  'badge',
  'excessLabel',
  'group',
]);

const baseStyle: ComponentMultiStyleConfig['baseStyle'] =
  helpers.definePartsStyle({
    container: {
      borderRadius: '2xl',
      overflow: 'hidden',
      boxShadow: 'card',
      img: {
        borderRadius: 'none',
      },
    },
    excessLabel: {
      borderRadius: '2xl',
    },
  });

const sizes: ComponentMultiStyleConfig['sizes'] = defineStyle({
  '3xl': helpers.definePartsStyle({
    container: {
      width: '180px',
      height: '180px',
    },
  }),
  '4xl': helpers.definePartsStyle({
    container: {
      width: '200px',
      height: '200px',
    },
  }),
  '5xl': helpers.definePartsStyle({
    container: {
      width: '350px',
      height: '350px',
    },
  }),
});

const esea = helpers.definePartsStyle({
  container: {
    borderRadius: '2xl',
    boxShadow: 'card',
  },
});

const variants: ComponentMultiStyleConfig['variants'] = defineStyle({
  esea,
});

export const avatar = helpers.defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: 'esea',
  },
  sizes,
});
