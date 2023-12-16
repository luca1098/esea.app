import FormField, { FormFieldProps } from '../Form/FormField';
import NumberInput, { NumberInputProps } from './NumberInput';

type NumberInputFieldProps = { name: string } & Omit<NumberInputProps, 'name'> &
  Omit<FormFieldProps, 'renderField'>;

const NumberInputField = (props: NumberInputFieldProps) => {
  return (
    <FormField
      name={props.name}
      renderField={({ field, fieldState, formState }) => {
        const {
          ref,
          onChange: onFieldChange,
          onBlur: onFieldBlur,
          ...fieldRest
        } = field;
        const { invalid, error } = fieldState;
        return (
          <NumberInput
            {...props}
            {...fieldRest}
            {...formState}
            ref={ref}
            isInvalid={invalid}
            errorMsg={error?.message}
            onChange={(e) => {
              onFieldChange(e);
              props.onChange && props.onChange(e);
            }}
            onBlur={(e) => {
              onFieldBlur();
              props.onBlur && props.onBlur(e);
            }}
          />
        );
      }}
    />
  );
};

export default NumberInputField;
