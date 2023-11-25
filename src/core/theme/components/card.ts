import {
  ComponentMultiStyleConfig,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers([
  'container',
  'header',
  'body',
  'footer',
]);

const baseStyle: ComponentMultiStyleConfig['baseStyle'] =
  helpers.definePartsStyle({
    container: {
      borderRadius: '2xl',
      overflow: 'hidden',
      boxShadow: 'card',
    },
  });
export const card = helpers.defineMultiStyleConfig({
  baseStyle,
});
