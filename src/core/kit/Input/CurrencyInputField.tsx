import _ from 'lodash';
import CurrencyInput, { CurrencyInputProps } from './CurrencyInput';
import FormField, { FormFieldProps } from '../Form/FormField';

type CurrencyInputFormFieldProps = {
  name: string;
  onChange?: (value: number | null) => void;
} & Omit<CurrencyInputProps, 'onClear' | 'onChange'> &
  Omit<FormFieldProps, 'renderField'>;

const CurrencyInputFormField = (props: CurrencyInputFormFieldProps) => {
  return (
    <FormField
      {...props}
      name={props.name}
      renderField={({ field, fieldState, formState }) => {
        const { invalid, error } = fieldState;
        return (
          <CurrencyInput
            {...field}
            {...fieldState}
            {...formState}
            {...props}
            onBlur={(e) => {
              field.onBlur();
              props.onBlur && props.onBlur(e);
            }}
            onChange={() => null}
            onValueChange={(values) => {
              const { floatValue } = values || {};
              const value = _.isNumber(floatValue) ? floatValue : null;
              field.onChange(value);
              props.onChange && props.onChange(value);
            }}
            isInvalid={invalid}
            errorMsg={error?.message}
          />
        );
      }}
    />
  );
};

export default CurrencyInputFormField;
