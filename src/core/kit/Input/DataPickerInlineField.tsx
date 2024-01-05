import { SyntheticEvent, useState } from 'react';
import FormField, { FormFieldProps } from '../Form/FormField';
import DataPickerInline, { DataPickerInlineProps } from './DataPickerInline';

type DataPickerFieldProps = {
  name: string;
  onChange?: DataPickerInlineProps['onChange'];
} & Omit<FormFieldProps, 'renderField'> &
  Omit<DataPickerInlineProps, 'starDate' | 'endDate' | 'onChange'>;

const DataPickerInlineField = (props: DataPickerFieldProps) => {
  const [endDate, setEndDate] = useState<Date | null>();

  return (
    <FormField
      name={props.name}
      renderField={({ field, fieldState, formState }) => {
        const { ref, value, ...fieldRest } = field;

        const getStartDateValue = () => {
          if (value && props.isRange) {
            const [start] = value;
            return start;
          }
          return value;
        };
        return (
          <DataPickerInline
            {...fieldRest}
            {...formState}
            {...props}
            isInvalid={fieldState.invalid}
            errorMsg={fieldState.error?.message}
            onChange={(
              date: Date | null | [Date | null, Date | null],
              e: SyntheticEvent | undefined,
            ) => {
              if (props.isRange && Array.isArray(date)) {
                const [, end] = date;

                setEndDate(end);
              }
              field.onChange(date);
              props.onChange && props.onChange(date, e);
            }}
            onBlur={() => {
              field.onBlur();
            }}
            startDate={getStartDateValue()}
            endDate={endDate}
          />
        );
      }}
    />
  );
};

export default DataPickerInlineField;
