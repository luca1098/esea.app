'use client';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { Link as NextLink } from '@chakra-ui/next-js';

export type BtnVariant = 'solid' | 'action' | 'outline' | 'link';

export type ButtonProps = {
  href?: string;
  isExternal?: boolean;
  label: string;
  variant?: BtnVariant;
} & Pick<
  ChakraButtonProps,
  | 'size'
  | 'isLoading'
  | 'leftIcon'
  | '_hover'
  | 'rightIcon'
  | 'disabled'
  | 'onClick'
  | 'type'
  | 'sx'
  | 'className'
  | 'm'
  | 'p'
  | 'mt'
  | 'ml'
  | 'mr'
  | 'mb'
>;

const Button = ({
  href,
  disabled,
  label,
  isExternal,
  isLoading,
  ...rest
}: ButtonProps) => {
  const externarLinkConfig = { target: '_blank', rel: 'noreferrer' };
  return href ? (
    <ChakraButton
      {...(isExternal ? externarLinkConfig : {})}
      as={NextLink}
      href={href}
      aria-label={label}
      isLoading={isLoading}
      loadingText={label}
      role='button'
      {...rest}
    >
      {label}
    </ChakraButton>
  ) : (
    <ChakraButton
      isLoading={isLoading}
      loadingText={label}
      disabled={disabled || isLoading}
      aria-label={label}
      {...rest}
    >
      {label}
    </ChakraButton>
  );
};

export default Button;
