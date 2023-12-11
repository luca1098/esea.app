import { MenuItemProps } from '@/core/config/menu';
import Link from '@/kit/Link/Link';
import { ListIcon, ListItem, Text } from '@chakra-ui/react';

type NavigationMenuItemProps = {
  isMenuExpanded: boolean;
  isActive: boolean;
} & MenuItemProps;
const NavigationMenuItem = ({
  label,
  path,
  disabled,
  icon,
  isMenuExpanded = true,
  isActive,
}: NavigationMenuItemProps) => {
  return (
    <Link href={path}>
      <ListItem
        display={'flex'}
        gap={isMenuExpanded ? 2 : 0}
        alignItems={'center'}
        fontWeight={'normal'}
        color={'white'}
        {...(isActive ? { bg: 'esea.blueLight' } : {})}
      >
        <ListIcon
          as={icon}
          m={0}
          {...(isActive
            ? { shadow: 'none', bg: 'esea.primary', color: 'white' }
            : { color: 'esea.primary' })}
        />
        {isMenuExpanded ? <Text>{label}</Text> : null}
      </ListItem>
    </Link>
  );
};

export default NavigationMenuItem;
