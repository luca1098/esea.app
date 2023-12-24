import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  InputLeftElement,
} from '@chakra-ui/react';
import { ChangeEvent, ForwardedRef, ReactElement, ReactNode } from 'react';
import React from 'react';
import FormControlWrapper, {
  FormControlWrapperProps,
} from '../Form/FormControllerWrapper';

type OptionValue = string | number;

type BaseSelectProps<T> = {
  leftElement?: ReactNode;
  options: T[];
  getOptionLabel: (o: T) => string;
  getValue: (o: T) => OptionValue;
  getKey: (o: T) => string;
  onChange: (e: ChangeEvent<HTMLSelectElement>, v: OptionValue) => void;
  defaultValue?: T;
} & Pick<
  ChakraSelectProps,
  | 'placeholder'
  | 'name'
  | 'icon'
  | 'size'
  | 'iconColor'
  | 'bgColor'
  | 'onBlur'
  | 'value'
  | 'variant'
> &
  FormControlWrapperProps;

export type SelectProps<T> = BaseSelectProps<T>;

const Select = <T,>(
  {
    placeholder,
    options,
    label,
    getOptionLabel,
    getValue,
    getKey,
    onChange,
    name,
    icon,
    iconColor,
    size,
    defaultValue,
    bgColor,
    value,
    leftElement,
    mt,
    mb,
    ml,
    mr,
    width,
    isDisabled,
    isInvalid,
    isRequired,
    isReadOnly,
    errorMsg,
    variant,
  }: SelectProps<T>,
  ref: ForwardedRef<HTMLSelectElement>,
) => {
  return (
    <FormControlWrapper
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      errorMsg={errorMsg}
      width={width}
      label={label}
    >
      {!!leftElement && (
        <InputLeftElement h={'full'}>{leftElement}</InputLeftElement>
      )}
      <ChakraSelect
        ref={ref}
        placeholder={placeholder}
        onChange={(_e) => onChange(_e, _e?.target?.value)}
        name={name}
        icon={icon}
        size={size}
        iconColor={iconColor}
        bgColor={bgColor}
        sx={leftElement ? { pl: 12 } : {}}
        value={value}
        variant={variant}
        {...(defaultValue ? { defaultValue: getValue(defaultValue) } : {})}
      >
        {options?.map((o) => (
          <option key={getKey(o)} value={getValue(o)}>
            {getOptionLabel(o)}
          </option>
        ))}
      </ChakraSelect>
    </FormControlWrapper>
  );
};

export default React.forwardRef(Select) as <T>(
  p: SelectProps<T> & { ref?: ForwardedRef<HTMLSelectElement> },
) => ReactElement;
