import { useTable } from 'react-table';
import Table from 'react-bootstrap/Table';

const DataTable = ({ columns, data, emptyMessage }) => {
  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const renderRow = row => {
    prepareRow(row);
    return (
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <td {...cell.getCellProps()}>
            {cell.render('Cell')}
          </td>
        ))}
      </tr>
    )
  }

  const renderEmptyMessage = (message) => {
    return (
      <tr>
        <td colSpan={columns.length} className='text-center'>{message}</td>
      </tr>
    )
  }

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.length === 0 ? renderEmptyMessage(emptyMessage) : rows.map(renderRow)}
      </tbody>
    </Table>
  );
};

export default DataTable