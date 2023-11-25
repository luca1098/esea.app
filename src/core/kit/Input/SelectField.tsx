import FormField, { FormFieldProps } from '../Form/FormField';
import Select, { SelectProps } from './Select';

type SelectFieldProps<T> = { onChange?: SelectProps<T>['onChange'] } & Omit<
  SelectProps<T>,
  'onChange'
> &
  Omit<FormFieldProps, 'renderField'>;

const SelectField = <T,>(props: SelectFieldProps<T>) => {
  return (
    <FormField
      name={props.name}
      renderField={({ field, fieldState, formState }) => {
        const { ref, ...fieldRest } = field;
        const { invalid, error } = fieldState;
        return (
          <Select<T>
            ref={ref}
            {...fieldRest}
            {...formState}
            {...props}
            isInvalid={invalid}
            errorMsg={error?.message}
            onBlur={(e) => {
              field.onBlur();
              props.onBlur && props.onBlur(e);
            }}
            onChange={(e, v) => {
              field.onChange(v);
              props.onChange && props.onChange(e, v);
            }}
          />
        );
      }}
    />
  );
};

export default SelectField;
