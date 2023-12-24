import FormField, { FormFieldProps } from '../Form/FormField';
import DataPicker, { DataPickerProps } from './DataPicker';

type DataPickerFieldProps = {
  onDataChange?: DataPickerProps['onDataChange'];
} & Omit<FormFieldProps, 'renderField'> &
  Omit<DataPickerProps, 'onDataChange' | 'selectDate'>;

const DataPickerField = (props: DataPickerFieldProps) => {
  return (
    <FormField
      name={props.name}
      renderField={({ field, fieldState, formState }) => {
        const { ref, value, ...fieldRest } = field;
        return (
          <DataPicker
            {...fieldRest}
            {...formState}
            {...props}
            isInvalid={fieldState.invalid}
            errorMsg={fieldState.error?.message}
            onDataChange={(date, e) => {
              field.onChange(date);
              props.onDataChange && props.onDataChange(date, e);
            }}
            onBlur={() => {
              field.onBlur();
              props.onBlur && field.onBlur();
            }}
            selectDate={value}
          />
        );
      }}
    />
  );
};

export default DataPickerField;
