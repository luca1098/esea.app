import FormField, { FormFieldProps } from '../Form/FormField';
import FileUploader, { FileUploaderProps } from './FileUploader';

export type FileUploaderFieldProps = {
  name: string;
  value?: FileUploaderProps['value'];
} & Omit<FileUploaderProps, 'name' | 'onDrop' | 'value'> &
  Omit<FormFieldProps, 'renderField'>;

const FileUploaderField = (props: FileUploaderFieldProps) => {
  return (
    <FormField
      name={props.name}
      renderField={({ field, fieldState, formState }) => {
        const {
          onChange: onFieldChange,
          onBlur: onFieldBlur,
          ...fieldRest
        } = field;

        const { invalid, error } = fieldState;
        return (
          <FileUploader
            {...props}
            {...fieldRest}
            {...formState}
            isInvalid={invalid}
            errorMsg={error?.message}
            onChange={(f) => {
              const isOneFile = props.maxFiles === 1;
              const value =
                isOneFile && f.target.files
                  ? (f.target.files || [])[0]
                  : f.target.files;

              onFieldChange(value);
              props.onChange && props.onChange(f);
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

export default FileUploaderField;
