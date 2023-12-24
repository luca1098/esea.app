import { ThemeOverride } from '@chakra-ui/react';
import { dataPickerStyles } from './data-picker';

export const styles: ThemeOverride['styles'] = {
  global: {
    ':host,:root': {
      '--esea-app-primary': '#0E2452', //'#41BBCC', //#158785 //#0E2452
      '--esea-app-blue': '#0E2452',
      '--esea-app-blue-light': '#364d7d',
      '--esea-app-primary-dark': '#136B80',
      '--esea-app-black': '#2D3748',
      '--esea-app-gray': '#F7FAFC', //'#F8F9FA',
      '--esea-app-text-gray': '#60616F',
    },
    html: {
      scrollBehavior: 'smooth',
      fontFamily: 'DM Sans, sans-serif',
    },
    body: {
      ...dataPickerStyles,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    a: {
      color: 'var(--esea-app-primary)',
      transition: 'all .2s ease-in-out',
      _hover: {
        color: 'var(--esea-app-primary-dark)',
        textDecoration: 'underline',
      },
    },
  },
};
