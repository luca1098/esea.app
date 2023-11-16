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
      bg: 'white',
      borderWidth: 1,
      padding: 3,
      mb: 1,
      cursor: 'pointer',
      rounded: 'lg',
    }),
  }),
};

export const listItem = helper.defineMultiStyleConfig({ variants });
