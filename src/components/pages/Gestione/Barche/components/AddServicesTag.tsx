import { ServiceProps } from '@/core/types/services';
import { CheckIcon, PlusIcon } from '@/kit/Icons/icons';
import { Icon, Tag, TagLabel } from '@chakra-ui/react';

type AddServicesTagProps = {
  service: ServiceProps;
  isAdded: boolean;
  onAddClick: (service: ServiceProps) => void;
};

const AddServicesTag = ({
  service,
  isAdded,
  onAddClick,
}: AddServicesTagProps) => {
  return (
    <Tag
      variant='subtle'
      colorScheme={isAdded ? 'green' : 'cyan'}
      onClick={() => onAddClick(service)}
      sx={{ cursor: 'pointer', pointerEvents: isAdded ? 'none' : 'default' }}
      _active={{ transform: 'scale(0.98)' }}
    >
      <Icon boxSize='12px' as={isAdded ? CheckIcon : PlusIcon} mr={2} />
      <TagLabel>{service.label}</TagLabel>
    </Tag>
  );
};

export default AddServicesTag;
