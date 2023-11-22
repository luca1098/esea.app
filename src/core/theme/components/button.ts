import {
  ComponentSingleStyleConfig,
  defineStyle,
  defineStyleConfig,
} from '@chakra-ui/react';

const baseStyle: ComponentSingleStyleConfig['baseStyle'] = {
  rounded: '2xl',
  fontWeight: '700',
  transition: 'all .2s ease-in-out',
  _hover: {
    textDecoration: 'none',
  },
  _active: {
    transform: 'scale(.95)',
  },
};

const solid = defineStyle({
  background: 'esea.primary',
  color: 'white',
  _hover: {
    background: 'esea.dark',
    _disabled: {
      background: 'esea.dark',
    },
  },
  _active: {
    background: 'esea.dark',
  },
});

const variants: ComponentSingleStyleConfig['variants'] = { solid };

export const button: ComponentSingleStyleConfig = defineStyleConfig({
  variants,
  baseStyle,
});
