import { CameraIcon } from '@/kit/Icons/icons';
import {
  DEFAULT_MAX_FILE_SIZE,
  FileUploaderProps,
} from '@/kit/Input/FileUploader';
import { Avatar, AvatarProps, Box, IconButton } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import FormControlWrapper from '../Form/FormControllerWrapper';
import { forwardRef } from 'react';
import { Nullish } from '@/core/shared/types/utils';

const defaultFileAccepted = {
  'image/*': ['.png', '.jpeg', '.jpg', '.webp'],
};

export type AvatarUploaderProps = { preview: Nullish<string> } & Pick<
  AvatarProps,
  'size'
> &
  Omit<FileUploaderProps, 'maxFiles'>;

const AvatarUploader = forwardRef<HTMLInputElement, AvatarUploaderProps>(
  (
    {
      size,
      name,
      preview,
      onBlur,
      onChange,
      value,
      accept = defaultFileAccepted,
      maxSize = DEFAULT_MAX_FILE_SIZE,
      isInvalid,
      ...formControlProps
    },
    ref,
  ) => {
    const { getRootProps, getInputProps, open } = useDropzone({
      noClick: true,
      noKeyboard: true,
      accept,
      maxFiles: 1,
      maxSize,
    });

    return (
      <FormControlWrapper
        {...formControlProps}
        isInvalid={isInvalid}
        width={'auto'}
      >
        <Box {...getRootProps()} position={'relative'} ref={ref}>
          <Avatar
            src={preview ?? ''}
            size={size}
            onClick={open}
            cursor={'pointer'}
            ignoreFallback
            bg='gray.400'
          />
          <Box as={'input'} {...getInputProps({ onChange })} onBlur={onBlur} />
          <IconButton
            icon={<CameraIcon />}
            aria-label='Seleziona una foto'
            position={'absolute'}
            bottom={-2}
            right={-2}
            onClick={open}
          />
        </Box>
      </FormControlWrapper>
    );
  },
);

AvatarUploader.displayName = 'AvatarUploader';

export default AvatarUploader;
