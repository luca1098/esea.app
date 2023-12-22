import { EditIcon, TrashIcon } from '@/kit/Icons/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import { CellContext } from '@tanstack/react-table';
import React from 'react';

export type RowActionsProps<T> = {
  row: CellContext<T, never>['row'];
  isLoading: boolean;
  onEdit?: (row: CellContext<T, never>['row']) => void;
  onDelete?: (row: CellContext<T, never>['row']) => void;
};

const RowActions = <T,>({
  row,
  isLoading,
  onEdit,
  onDelete,
}: RowActionsProps<T>) => {
  return (
    <Flex>
      <IconButton
        icon={<EditIcon />}
        aria-label='Modifica'
        variant={'action'}
        onClick={() => onEdit && onEdit(row)}
        disabled={isLoading}
      />
      <IconButton
        icon={<TrashIcon />}
        aria-label='Elimina'
        variant={'action'}
        onClick={() => onDelete && onDelete(row)}
        disabled={isLoading}
      />
    </Flex>
  );
};

export default RowActions;
