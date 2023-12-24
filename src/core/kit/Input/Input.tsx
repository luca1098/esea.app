import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { ReactNode, forwardRef } from 'react';
import FormControlWrapper, {
  FormControlWrapperProps,
} from '../Form/FormControllerWrapper';

export type InputVariantProps = 'outline' | 'unstyled' | undefined;

type BaseInputProps = {
  leftElement?: ReactNode;
  leftAddon?: ReactNode;
  rightElement?: ReactNode;
  variant?: InputVariantProps;
} & Pick<
  ChakraInputProps,
  | 'placeholder'
  | 'onFocus'
  | 'onBlur'
  | 'onChange'
  | 'value'
  | 'autoComplete'
  | 'name'
  | 'variant'
  | 'bgColor'
  | 'type'
>;

export type InputProps = FormControlWrapperProps & BaseInputProps;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      leftElement,
      rightElement,
      leftAddon,
      placeholder,
      onFocus,
      onBlur,
      onChange,
      value,
      autoComplete,
      name,
      bgColor,
      variant = 'outline',
      type,
      ...formControlProps
    },
    ref,
  ) => {
    return (
      <>
        <FormControlWrapper {...formControlProps}>
          {!!leftElement && (
            <InputLeftElement h={'full'}>{leftElement}</InputLeftElement>
          )}
          {!!leftAddon && (
            <InputLeftAddon h={'full'}>{leftAddon}</InputLeftAddon>
          )}
          <ChakraInput
            ref={ref}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            value={value ?? ''}
            bgColor={bgColor}
            autoComplete={autoComplete}
            name={name}
            variant={variant}
            type={type}
          />
          {!!rightElement && (
            <InputRightElement>{rightElement}</InputRightElement>
          )}
        </FormControlWrapper>
      </>
    );
  },
);

Input.displayName = 'Input';

export default Input;
