import { Controller, ControllerProps, useFormContext } from 'react-hook-form';

export type FormFieldProps = {
  name: string;
  renderField: ControllerProps['render'];
  controllerProps?: Omit<ControllerProps, 'render' | 'name'>;
};

const FormField = ({ name, renderField, controllerProps }: FormFieldProps) => {
  const { control, formState } = useFormContext();
  const defaultValue = (formState?.defaultValues || {})[name];
  return (
    <Controller
      name={name}
      control={control}
      render={renderField}
      {...controllerProps}
      defaultValue={defaultValue}
    />
  );
};

export default FormField;
