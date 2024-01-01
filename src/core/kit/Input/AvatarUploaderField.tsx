import FormField, { FormFieldProps } from '../Form/FormField';
import AvatarUploader, { AvatarUploaderProps } from './AvatarUploader';

export type AvatarUploaderFieldProps = {
  name: string;
  value?: AvatarUploaderProps['value'];
} & Omit<AvatarUploaderProps, 'name' | 'onDrop' | 'value'> &
  Omit<FormFieldProps, 'renderField'>;

const AvatarUploaderField = (props: AvatarUploaderFieldProps) => {
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
          <AvatarUploader
            {...props}
            {...fieldRest}
            {...formState}
            isInvalid={invalid}
            errorMsg={error?.message}
            onChange={(f) => {
              const value = (f.target.files || [])[0];

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

export default AvatarUploaderField;
