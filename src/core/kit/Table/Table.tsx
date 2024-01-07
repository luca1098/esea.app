import {
  Table as ChakraTable,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
  Flex,
  Box,
} from '@chakra-ui/react';
import {
  Cell,
  ColumnDef,
  Header,
  RowData,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { SortDownIcon, SortUpIcon, UnsortedIcon } from '../Icons/icons';
import Pagination from './components/Pagination';
import EmptyBox from '@/components/Empty/EmptyBox';

type TableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyLabel?: string;
};

const Table = <TData extends RowData, TValue = unknown>({
  data,
  columns,
  emptyLabel,
}: TableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <>
      <ChakraTable>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <HeaderCell header={header} key={header.id} />
              ))}
            </Tr>
          ))}
        </Thead>

        {table.getRowModel().rows.length ? (
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <RowCell key={cell.id} cell={cell} />
                ))}
              </Tr>
            ))}
          </Tbody>
        ) : null}
      </ChakraTable>
      {table.getRowModel().rows.length ? (
        <Pagination table={table} />
      ) : (
        <Box p={6}>
          <EmptyBox msg={emptyLabel ?? 'Ancora essun elemento'} />
        </Box>
      )}
    </>
  );
};

export default Table;

type HeaderCellProps<TData, TValue> = {
  header: Header<TData, TValue>;
};

const HeaderCell = <TData extends RowData, TValue = unknown>({
  header,
}: HeaderCellProps<TData, TValue>) => {
  return (
    <Th onClick={header.column.getToggleSortingHandler()}>
      <Flex alignItems={'center'}>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        {header.column.getCanSort()
          ? {
              asc: <SortUpIcon />,
              desc: <SortDownIcon />,
            }[header.column.getIsSorted() as string] ?? <UnsortedIcon />
          : null}
      </Flex>
    </Th>
  );
};

type RowCellProps<TData, TValue> = {
  cell: Cell<TData, TValue>;
};

const RowCell = <TData extends RowData, TValue = unknown>({
  cell,
}: RowCellProps<TData, TValue>) => {
  return (
    <Td key={cell.id}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Td>
  );
};
