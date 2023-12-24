import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Input, { InputProps } from './Input';

export type CurrencyInputProps = {
  maxAmount?: number;
} & Pick<
  NumericFormatProps,
  'suffix' | 'decimalScale' | 'value' | 'type' | 'onValueChange' | 'id'
> &
  Omit<InputProps, 'maxLength' | 'value' | 'type' | 'autoComplete'>;

const CurrencyInput = forwardRef(
  ({ maxAmount = Math.pow(10, 13), ...props }: CurrencyInputProps, ref) => {
    return (
      <NumericFormat
        getInputRef={ref}
        customInput={Input}
        fixedDecimalScale
        allowedDecimalSeparators={[',', '.']}
        decimalSeparator=','
        thousandSeparator='.'
        suffix=' €'
        decimalScale={2}
        isAllowed={(values) => {
          const { floatValue } = values;
          if (floatValue) {
            return Math.abs(floatValue) <= maxAmount;
          }
          return true;
        }}
        {...props}
        value={props.value ?? ''}
      />
    );
  },
);

CurrencyInput.displayName = 'CurrencyInput';

export default CurrencyInput;
