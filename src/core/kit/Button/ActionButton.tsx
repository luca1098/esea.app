import Button, { ButtonProps } from './Button';

export type ActionButtonProps = { isActive?: boolean } & Omit<
  ButtonProps,
  'variant'
>;

export const ActionButton = ({ isActive, ...rest }: ActionButtonProps) => {
  return (
    <Button
      {...rest}
      variant='action'
      sx={
        isActive
          ? {
              background: 'rgba(255,255,255,0.5)',
              borderWidth: '2px',
              borderColor: 'white',
              backdropFilter: 'auto',
              backdropBlur: '20px',
            }
          : {}
      }
    />
  );
};
