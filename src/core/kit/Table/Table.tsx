import {
  Table as ChakraTable,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
  Flex,
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

type TableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

const Table = <TData extends RowData, TValue = unknown>({
  data,
  columns,
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
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <RowCell key={cell.id} cell={cell} />
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
      <Pagination table={table} />
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
