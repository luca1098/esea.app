import React from 'react';
import Button, { ButtonProps } from './Button';
import { useRouter } from 'next/router';
import { BackIcon } from '../Icons/icons';

type BackButtonProps = { label?: string } & Omit<ButtonProps, 'label'>;

const BackButton = (props: BackButtonProps) => {
  const router = useRouter();
  return (
    <Button
      label='Indietro'
      leftIcon={<BackIcon />}
      variant='link'
      onClick={() => router.back()}
      {...props}
    />
  );
};

export default BackButton;
