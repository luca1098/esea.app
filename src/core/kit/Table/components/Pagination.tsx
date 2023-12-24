import {
  PaginationArrowLeftDoubleIcon,
  PaginationArrowLeftIcon,
  PaginationArrowRightDoubleIcon,
  PaginationArrowRightIcon,
} from '@/kit/Icons/icons';
import Select from '@/kit/Input/Select';
import {
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { RowData, Table } from '@tanstack/react-table';
import React from 'react';

const rowsPerPage = [10, 20, 30, 40, 50];

type PaginationProps<TData> = {
  table: Table<TData>;
};

const Pagination = <TData extends RowData>({
  table,
}: PaginationProps<TData>) => {
  return (
    <Grid templateColumns='repeat(8, 1fr)' my={4}>
      <GridItem colSpan={5}>
        <Flex gap={2}>
          <IconButton
            icon={<PaginationArrowLeftDoubleIcon />}
            aria-label='Vai alla prima pagina'
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
            variant={'outline'}
          />
          <IconButton
            icon={<PaginationArrowLeftIcon />}
            aria-label='Vai alla pagina precedente'
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            variant={'outline'}
          />
          <IconButton
            icon={<PaginationArrowRightIcon />}
            aria-label='Vai alla pagina successiva'
            onClick={() => table.nextPage()}
            variant={'outline'}
            isDisabled={!table.getCanNextPage()}
          />
          <IconButton
            icon={<PaginationArrowRightDoubleIcon />}
            aria-label={"Vai all'ultima pagina"}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
            variant={'outline'}
          />
          <FormControl flex={1}>
            <Flex gap={1} alignItems={'center'}>
              <FormLabel>Vai alla pagina:</FormLabel>
              <Input
                maxW={'80px'}
                type='number'
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className='border p-1 rounded w-16'
              />
            </Flex>
          </FormControl>
        </Flex>
      </GridItem>
      <GridItem colSpan={3}>
        <Flex gap={2} alignItems={'center'} justifyContent={'end'}>
          <Flex maxW={'180px'}>
            <Select<number>
              options={rowsPerPage}
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              getKey={(i) => `${i}`}
              getValue={(i) => i}
              getOptionLabel={(i) => `${i} per pagina`}
            />
          </Flex>
          <Flex>
            <Text>Pagina</Text>
            <Text fontWeight={'bold'}>
              {`${
                table.getState().pagination.pageIndex + 1
              } di ${table.getPageCount()}`}
            </Text>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Pagination;
