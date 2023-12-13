import { forwardRef } from 'react';
import { DoubleArrowDxIcon } from '@/kit/Icons/icons';
import { IconButton, IconButtonProps } from '@chakra-ui/button';

type ExpandButtonProps = {
  isExpanded: boolean;
} & Omit<IconButtonProps, 'aria-label' | 'aria-expanded'>;

const ExpandButton = forwardRef<HTMLButtonElement, ExpandButtonProps>(
  ({ onClick, isExpanded, ...rest }, ref) => {
    return (
      <IconButton
        {...rest}
        ref={ref}
        icon={<DoubleArrowDxIcon />}
        onClick={onClick}
        aria-label='Espandi menu laterale'
        aria-expanded={isExpanded}
        position={'absolute'}
        right={-4}
        bg={'esea.primary'}
        top={8}
        cursor={'pointer'}
        shadow={'menu.item'}
      />
    );
  },
);
ExpandButton.displayName = 'ExpandButton';

export default ExpandButton;
