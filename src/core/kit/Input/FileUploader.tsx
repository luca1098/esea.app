import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Flex,
  Text,
} from '@chakra-ui/react';
import { ReactNode, forwardRef } from 'react';
import FormControlWrapper, {
  FormControlWrapperProps,
} from '../Form/FormControllerWrapper';

import { useDropzone } from 'react-dropzone';

export type InputVariantProps = 'outline' | 'unstyled' | undefined;

type BaseInputProps = {
  variant?: InputVariantProps;
} & Pick<
  ChakraInputProps,
  | 'placeholder'
  | 'onFocus'
  | 'onBlur'
  | 'onChange'
  | 'value'
  | 'autoComplete'
  | 'name'
  | 'variant'
  | 'bgColor'
>;

export type InputProps = FormControlWrapperProps & BaseInputProps;

const FileUploader = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      onFocus,
      onBlur,
      onChange,
      value,
      autoComplete,
      name,
      bgColor,
      variant = 'outline',
      ...formControlProps
    },
    ref,
  ) => {
    const onDrop = (...props: any) => {
      console.log('#### Drop', { props });
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <FormControlWrapper {...formControlProps}>
        <Flex
          {...getRootProps()}
          borderWidth={1}
          borderStyle={'dashed'}
          borderColor={'esea.primary'}
          bg={'esea.gray'}
          rounded={'2xl'}
          padding={6}
          alignItems={'center'}
          justifyContent={'center'}
          w={'full'}
        >
          <input {...getInputProps()} />
          <Text>Clicca o trascina la tua immagine qui</Text>
        </Flex>
      </FormControlWrapper>
    );
  },
);

FileUploader.displayName = 'FileUploader';

export default FileUploader;
