import {
  ComponentMultiStyleConfig,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers([
  'stepper',
  'step',
  'title',
  'description',
  'indicator',
  'separator',
  'icon',
  'number',
]);

const baseStyle: ComponentMultiStyleConfig['baseStyle'] =
  helpers.definePartsStyle({
    indicator: {
      rounded: 'lg',
      '&[data-status="active"]': {
        borderColor: 'esea.primary',
      },
      '&[data-status="complete"]': {
        bgColor: 'esea.primary',
      },
    },
    separator: {
      '&[data-status="complete"]': {
        bgColor: 'esea.primary',
      },
    },
  });

export const stepper = helpers.defineMultiStyleConfig({ baseStyle });
