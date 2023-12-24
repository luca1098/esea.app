import FormField, { FormFieldProps } from '../Form/FormField';
import PhoneInput, { PhoneInputProps } from './PhoneInput';

type PhoneNumberFormFieldProps = { name: string } & Omit<
  FormFieldProps,
  'renderField'
> &
  Omit<PhoneInputProps, 'isInvalid' | 'errorMsg'>;

const PhoneInputField = (props: PhoneNumberFormFieldProps) => {
  return (
    <FormField
      name={props.name}
      renderField={({ field, fieldState, formState }) => {
        const { ref, ...fieldRest } = field;
        const { invalid, error } = fieldState;
        return (
          <PhoneInput
            {...fieldRest}
            {...formState}
            {...props}
            ref={ref}
            isInvalid={invalid}
            errorMsg={error?.message}
            onChange={(e) => {
              field.onChange(e.target.value);
              props.onChange && props.onChange(e);
            }}
            onBlur={(e) => {
              field.onBlur();
              props.onBlur && props.onBlur(e);
            }}
          />
        );
      }}
    />
  );
};

export default PhoneInputField;
