import NextLink from 'next/link';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type LinkVariantProps = 'menuLink' | 'underline';

type BaseLinkProps = {
  isExternal?: boolean;
  variant?: LinkVariantProps;
} & Pick<ChakraLinkProps, 'href' | 'onClick' | 'tabIndex'> &
  PropsWithChildren;

type LinkProps = BaseLinkProps;

const Link = ({ children, isExternal, ...rest }: LinkProps) => {
  const externarLinkConfig = { target: '_blank', rel: 'noreferrer' };
  return (
    <ChakraLink
      as={NextLink}
      {...(isExternal ? externarLinkConfig : {})}
      {...rest}
    >
      {children}
    </ChakraLink>
  );
};

export default Link;
