import { MenuItemProps } from '@/core/config/menu';
import { UnorderedList } from '@chakra-ui/react';
import React from 'react';
import NavigationMenuItem from './NavigationMenuItem';
import { useRouter } from 'next/router';
import { getNormalizedPath } from '../utils';

type NavigationMenuProps = {
  menu: MenuItemProps[];
  isMenuExpanded: boolean;
};
const NavigationMenu = ({ menu, isMenuExpanded }: NavigationMenuProps) => {
  const { asPath } = useRouter();
  const currentpath = getNormalizedPath(asPath);
  return (
    <UnorderedList
      variant={'navigation'}
      margin={0}
      sx={{ a: { _hover: { textDecoration: 'none' } } }}
    >
      {menu.map((item, index) => {
        console.log('##', { path: item.path });
        return (
          <NavigationMenuItem
            key={item.id}
            isMenuExpanded={isMenuExpanded}
            {...item}
            isActive={currentpath.includes(item.path)}
          />
        );
      })}
    </UnorderedList>
  );
};

export default NavigationMenu;
