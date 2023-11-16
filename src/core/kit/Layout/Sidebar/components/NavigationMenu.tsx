import { MenuItemProps } from '@/core/config/menu';
import { UnorderedList } from '@chakra-ui/react';
import React from 'react';
import NavigationMenuItem from './NavigationMenuItem';

type NavigationMenuProps = {
  menu: MenuItemProps[];
  isMenuExpanded: boolean;
};
const NavigationMenu = ({ menu, isMenuExpanded }: NavigationMenuProps) => {
  return (
    <UnorderedList variant={'navigation'} margin={0}>
      {menu.map((item) => (
        <NavigationMenuItem
          key={item.id}
          isMenuExpanded={isMenuExpanded}
          {...item}
        />
      ))}
    </UnorderedList>
  );
};

export default NavigationMenu;
