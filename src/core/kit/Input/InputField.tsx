import Input, { InputProps } from './Input';
import FormField, { FormFieldProps } from '../Form/FormField';

type InputFieldProps = { name: string } & Omit<InputProps, 'name'> &
  Omit<FormFieldProps, 'renderField'>;

const InputField = (props: InputFieldProps) => {
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
          <Input
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

export default InputField;
