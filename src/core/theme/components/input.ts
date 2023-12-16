import {
  ComponentMultiStyleConfig,
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['field', 'addon', 'element']);

export const outlineFieldStyle = defineStyle({
  bg: 'white',
  borderWidth: '1px',
  outlineWidth: '1px',
  outlineOffset: 0,
  _hover: {
    borderColor: 'esea.primary',
    _disabled: {
      borderColor: 'gray.400',
      outlineColor: 'gray.400',
    },
  },
  _focus: {
    borderColor: 'esea.primary',
    outlineColor: 'esea.primary',
    boxShadow: 'none',
  },
});

export const inputVariants: ComponentMultiStyleConfig['variants'] = {
  outline: helpers.definePartsStyle({
    field: outlineFieldStyle,
  }),
};

export const inputBaseStyle: ComponentMultiStyleConfig['baseStyle'] =
  helpers.definePartsStyle({
    field: {
      borderRadius: '2xl',
    },
    addon: {
      borderRadius: '2xl',
      padding: 0,
    },
  });
export const input = helpers.defineMultiStyleConfig({
  baseStyle: inputBaseStyle,
  variants: inputVariants,
});
