import { ThemeOverride } from '@chakra-ui/react';
import { listItem } from './list';
import { container } from './container';
import { button } from './button';
import { input } from './input';
import { heading } from './heading';
import { card } from './card';
import { select } from './select';

export const components: ThemeOverride['components'] = {
  List: listItem,
  Container: container,
  Button: button,
  Input: input,
  Select: select,
  Heading: heading,
  Card: card,
};
