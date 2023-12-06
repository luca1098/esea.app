import {
  Box,
  InputProps as ChakraInputProps,
  Flex,
  Text,
} from '@chakra-ui/react';
import FormControlWrapper, {
  FormControlWrapperProps,
} from '../Form/FormControllerWrapper';

import { DropzoneOptions, useDropzone } from 'react-dropzone';

export const DEFAULT_MAX_FILE_SIZE = 3000000; //3MB

export const DEFAULT_ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const defaultFileAccepted = {
  'image/*': ['.png', '.jpeg', '.jpg', '.webp'],
};

export type InputVariantProps = 'outline' | 'unstyled' | undefined;

type BaseFileUploader = {
  variant?: InputVariantProps;
  value: File | File[] | null | undefined;
} & Pick<
  ChakraInputProps,
  | 'placeholder'
  | 'autoComplete'
  | 'name'
  | 'variant'
  | 'bgColor'
  | 'onBlur'
  | 'onChange'
>;

export type FileUploaderProps = FormControlWrapperProps &
  BaseFileUploader &
  Pick<DropzoneOptions, 'accept' | 'maxFiles' | 'maxSize'>;

const FileUploader = ({
  placeholder,
  onBlur,
  onChange,
  value,
  autoComplete,
  name,
  accept = defaultFileAccepted,
  bgColor,
  variant = 'outline',
  maxFiles,
  maxSize = DEFAULT_MAX_FILE_SIZE,
  isInvalid,
  ...formControlProps
}: FileUploaderProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles,
    maxSize,
  });

  const renderChildred = () => {
    let msg = 'Clicca o trascina la tua immagine qui';
    if (value) {
      if (Array.isArray(value)) {
        const fileArrayName = value.reduce(
          (acc: string[], curr) => [...acc, curr?.name],
          [],
        );
        msg = fileArrayName.join(', ');
      } else msg = value?.name;
    }
    return <Text>{msg}</Text>;
  };

  return (
    <FormControlWrapper {...formControlProps} isInvalid={isInvalid}>
      <Flex
        {...getRootProps()}
        borderWidth={1}
        borderStyle={'dashed'}
        borderColor={isInvalid ? 'red.300' : 'esea.primary'}
        bg={isInvalid ? 'red.50' : 'esea.gray'}
        rounded={'2xl'}
        padding={6}
        alignItems={'center'}
        justifyContent={'center'}
        w={'full'}
        minH={'130px'}
      >
        <Box as={'input'} {...getInputProps({ onChange })} onBlur={onBlur} />
        {renderChildred()}
      </Flex>
    </FormControlWrapper>
  );
};

export default FileUploader;
