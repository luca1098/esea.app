import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Input, { InputProps } from './Input';

export type NumberInputProps = Omit<NumericFormatProps, 'customInput'> &
  Omit<InputProps, 'value'>;

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    return <NumericFormat getInputRef={ref} customInput={Input} {...props} />;
  },
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
