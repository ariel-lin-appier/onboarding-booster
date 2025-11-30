import { DataRow, DataIssue } from '../App';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface DataTableProps {
  dataRows: DataRow[];
  issues: DataIssue[];
}

export function DataTable({ dataRows, issues }: DataTableProps) {
  const hasIssue = (column: string) => {
    return issues.some(issue => issue.column === column && !issue.fixed);
  };

  const getCellIssue = (column: string, value: string, row: DataRow) => {
    const issue = issues.find(i => i.column === column && !i.fixed);
    if (!issue) return null;

    // Check specific conditions for event data
    if (column === 'user_id' && value === '$n/a$') return issue;
    if (column === 'timestamp' && !value.includes('T')) return issue;
    if (column === 'revenue' && !value && row.event_type === 'purchase') return issue;

    return null;
  };

  if (dataRows.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="text-center text-slate-400">
          <p>No data uploaded yet</p>
          <p className="text-sm mt-1">Upload a CSV file to see your data here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>event_id</TableHead>
              <TableHead>event_type</TableHead>
              <TableHead className={hasIssue('user_id') ? 'bg-red-50 border-b-2 border-red-300' : ''}>
                user_id
              </TableHead>
              <TableHead className={hasIssue('timestamp') ? 'bg-red-50 border-b-2 border-red-300' : ''}>
                timestamp
              </TableHead>
              <TableHead>product_id</TableHead>
              <TableHead className={hasIssue('revenue') ? 'bg-yellow-50 border-b-2 border-yellow-300' : ''}>
                revenue
              </TableHead>
              <TableHead>channel</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.event_id}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {row.event_type}
                  </span>
                </TableCell>
                <TableCell
                  className={
                    getCellIssue('user_id', row.user_id, row)
                      ? 'bg-red-50 text-red-900'
                      : ''
                  }
                >
                  {row.user_id || <span className="text-slate-400 italic">null</span>}
                </TableCell>
                <TableCell
                  className={
                    getCellIssue('timestamp', row.timestamp, row)
                      ? 'bg-red-50 text-red-900'
                      : ''
                  }
                >
                  {row.timestamp}
                </TableCell>
                <TableCell>{row.product_id}</TableCell>
                <TableCell
                  className={
                    getCellIssue('revenue', row.revenue, row)
                      ? 'bg-yellow-50 text-yellow-900'
                      : ''
                  }
                >
                  {row.revenue || <span className="text-slate-400 italic">-</span>}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    row.channel === 'web' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {row.channel}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-sm text-slate-600">
        Showing {dataRows.length} rows
      </div>
    </div>
  );
}