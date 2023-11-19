import { ThemeOverride } from '@chakra-ui/react';
import { listItem } from './list';
import { container } from './container';
import { button } from './button';
import { input } from './input';

export const components: ThemeOverride['components'] = {
  List: listItem,
  Container: container,
  Button: button,
  Input: input,
};
