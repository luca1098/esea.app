import { MenuItemProps } from '@/core/config/menu';
import Link from '@/kit/Link/Link';
import { Icon, ListIcon, ListItem, Text } from '@chakra-ui/react';

type NavigationMenuItemProps = {
  isMenuExpanded: boolean;
} & MenuItemProps;
const NavigationMenuItem = ({
  label,
  path,
  disabled,
  icon,
  isMenuExpanded = true,
}: NavigationMenuItemProps) => {
  return (
    <Link href={path}>
      <ListItem
        display={'flex'}
        gap={isMenuExpanded ? 2 : 0}
        alignItems={'center'}
      >
        <ListIcon as={icon} />
        {isMenuExpanded ? <Text>{label}</Text> : null}
      </ListItem>
    </Link>
  );
};

export default NavigationMenuItem;
