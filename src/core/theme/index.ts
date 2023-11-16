import { ThemeOverride, extendTheme } from '@chakra-ui/react';
import { colors } from './colors/colors';
import { components } from './components';
import { config } from './config/config';

export const theme: ThemeOverride = extendTheme({
  colors,
  components,
  config,
  // styles,
  // shadows,
});
