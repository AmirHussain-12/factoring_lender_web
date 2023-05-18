import { DateTime } from "luxon";
import { Badge } from "react-bootstrap";
import { getInvoiceStatusColor, toTitleCase } from "../helpers";

export const INVOICE_COLUMNS = [
  {
    Header: 'Invoice No.',
    accessor: 'invoice_number'
  },
  { Header: 'Amount', accessor: 'invoice_amount', Cell: ({value}) => `$${value}`},
  { Header: 'Status', accessor: 'status', Cell: ({value}) => <Badge bg={getInvoiceStatusColor(value)}>{toTitleCase(value)}</Badge> },
  { Header: 'Due Date', accessor: 'invoice_due_date', Cell: ({value}) => DateTime.fromISO(value).toFormat('LLL dd, yyyy') },
  {
    Header: 'Assigned Lender',
    accessor: 'lender.name',
    Cell: cell => cell.value || 'None'
  }
];