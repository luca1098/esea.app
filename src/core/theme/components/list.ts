import {
  ComponentMultiStyleConfig,
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/react';

const helper = createMultiStyleConfigHelpers(['container', 'icon', 'item']);

const variants: ComponentMultiStyleConfig['variants'] = {
  navigation: helper.definePartsStyle({
    container: defineStyle({
      margin: 0,

      listStyle: 'none',
    }),
    item: defineStyle({
      mb: 1,
      cursor: 'pointer',
      rounded: '2xl',
      fontWeight: '600',
      color: 'text.gray',
      px: 2,
      py: 3,
      fontSize: 'lg',
    }),
    icon: defineStyle({
      rounded: '2xl',
      width: '50px',
      height: '50px',
      padding: 3.5,
      bg: 'white',

      shadow: 'menu.item',
    }),
  }),
};

export const listItem = helper.defineMultiStyleConfig({ variants });
