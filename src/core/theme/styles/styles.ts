import { ThemeOverride } from '@chakra-ui/react';

export const styles: ThemeOverride['styles'] = {
  global: {
    ':host,:root': {
      '--esea-app-primary': '#3b9eb5', //'#41BBCC', //#158785
      '--esea-app-primary-dark': '#136B80',
      '--esea-app-black': '#2D3748',
      '--esea-app-gray': '#F7FAFC', //'#F8F9FA',
      '--esea-app-text-gray': '#60616F',
    },
    html: {
      scrollBehavior: 'smooth',
      fontFamily: 'DM Sans, sans-serif',
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
