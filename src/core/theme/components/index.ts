import { ThemeOverride } from '@chakra-ui/react';
import { listItem } from './list';
import { container } from './container';
import { button } from './button';
import { input } from './input';
import { heading } from './heading';
import { card } from './card';
import { select } from './select';
import { avatar } from './avatar';
import { stepper } from './stepper';
import { skeleton } from './skeletron';

export const components: ThemeOverride['components'] = {
  List: listItem,
  Container: container,
  Button: button,
  Input: input,
  Select: select,
  Heading: heading,
  Card: card,
  Avatar: avatar,
  Stepper: stepper,
  Skeleto: skeleton,
};
