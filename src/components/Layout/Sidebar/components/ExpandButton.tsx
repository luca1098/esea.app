import { DoubleArrowDxIcon } from '@/kit/Icons/icons';
import { IconButton, IconButtonProps } from '@chakra-ui/button';

type ExpandButtonProps = {
  isExpanded: boolean;
} & Omit<IconButtonProps, 'aria-label' | 'aria-expanded'>;
const ExpandButton = ({ onClick, isExpanded }: ExpandButtonProps) => {
  return (
    <IconButton
      as={DoubleArrowDxIcon}
      onClick={onClick}
      aria-label='Espandi menu laterale'
      aria-expanded={isExpanded}
      position={'absolute'}
      size={'sm'}
      right={-4}
      bg={'esea.gray'}
      cursor={'pointer'}
      shadow={'menu.item'}
    />
  );
};

export default ExpandButton;
