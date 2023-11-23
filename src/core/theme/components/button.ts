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
const action = defineStyle({
  background: 'transparent',
  backdropFilter: 'auto',
  color: 'black',
  _hover: {
    background: 'white',
    _disabled: {
      background: 'rgba(255,255,255,0.5)',
    },
  },
  _active: {
    background: 'white',
  },
});

const variants: ComponentSingleStyleConfig['variants'] = { solid, action };

export const button: ComponentSingleStyleConfig = defineStyleConfig({
  variants,
  baseStyle,
});
