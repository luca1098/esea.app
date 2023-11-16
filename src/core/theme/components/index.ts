import { ThemeOverride } from '@chakra-ui/react';
import { listItem } from './list';
import { container } from './container';

export const components: ThemeOverride['components'] = {
  List: listItem,
  Container: container,
};
