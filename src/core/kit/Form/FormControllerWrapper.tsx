import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  FormControlProps as ChakraFormControlProps,
  InputGroup,
} from '@chakra-ui/react';
import { PropsWithChildren, forwardRef } from 'react';

export type FormControlProps = Pick<
  ChakraFormControlProps,
  | 'mt'
  | 'mb'
  | 'ml'
  | 'mr'
  | 'width'
  | 'isDisabled'
  | 'isInvalid'
  | 'isRequired'
  | 'isReadOnly'
  | 'position'
>;

type BaseFormControlWrapperProps = {
  label?: string;
  helperText?: string;
  errorMsg?: string;
};
export type FormControlWrapperProps = BaseFormControlWrapperProps &
  FormControlProps;

const FormControlWrapper = forwardRef<
  HTMLDivElement,
  FormControlWrapperProps & PropsWithChildren
>(
  (
    {
      children,
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
      label,
      helperText,
      errorMsg,
      mt,
      ml,
      mb,
      mr,
      width,
      position,
    },
    ref,
  ) => {
    return (
      <FormControl
        mt={mt}
        ml={ml}
        mb={mb}
        mr={mr}
        width={width}
        isRequired={isRequired}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        ref={ref}
        position={position}
      >
        {!!label && (
          <FormLabel fontWeight={'bold'} color={'text.gray'}>
            {label}
          </FormLabel>
        )}
        <InputGroup>{children}</InputGroup>
        <FormErrorMessage>{errorMsg}</FormErrorMessage>
        {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);

FormControlWrapper.displayName = 'FormControlWrapper';

export default FormControlWrapper;
