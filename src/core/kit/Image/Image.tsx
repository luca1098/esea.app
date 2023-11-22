import { chakra } from '@chakra-ui/react';
import NextImage from 'next/image';

const Image = chakra(NextImage, {
  baseStyle: {
    width: '100%',
    height: 'auto',
  },
  shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt'].includes(prop),
});

export default Image;
