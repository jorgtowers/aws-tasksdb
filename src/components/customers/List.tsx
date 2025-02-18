// components/customers/CustomerList.tsx
// ... (estructura similar, cambiando iTask a iCustomer, K_PAGES_TASKS_PATH a K_PAGES_CUSTOMERS_PATH, title a customerName, description a zone y contactName/contactPhone, y eliminando completed)
import React from 'react';
import { iCustomer } from '../../interfaces/all';
import { Card, CardContent, CardActionArea, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useRouter } from "next/router";
import { K_APP_PATH, K_PAGES_CUSTOMERS_PATH } from '../../utils/settings';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ImportExport } from '@mui/icons-material';

// ... (Resto del código similar, adaptando los campos a customerName, zone, contactName, contactPhone)
interface Props {
    items: iCustomer[];
}
interface Column {
    id: 'customername' | 'zone' | 'contactname' | 'contactphone' ;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  interface Data {
    customername: string;
    zone: string;
    contactname: string;
    contactphone: string;
  }
  
  function createData(
    customername: string,
    zone: string,
    contactname: string,
    contactphone: string,
  ): Data {
    return { customername, zone, contactname,contactphone };
  }
  const columns: readonly Column[] = [
    { id: 'customername', label: 'Name', minWidth: 170 },
    { id: 'zone', label: 'Zone', minWidth: 100 },
    {
      id: 'contactname',
      label: 'Contact',
      minWidth: 170,
      align: 'right',
     // format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'contactphone',
      label: 'Phone',
      minWidth: 170,
      align: 'right',
     // format: (value: number) => value.toLocaleString('en-US'),
    }
  ];



export function CustomerList({ items }: Props) {
    const router = useRouter();
    const [selectedCard, setSelectedCard] = React.useState(0);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handerCardClick = (ix: any) => {
        let selected = items.findIndex(x => x.id == ix.toString());
        setSelectedCard(ix);
        router.push(`${K_PAGES_CUSTOMERS_PATH}/edit/${ix}`);
    }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const rows = items.map(item=>createData(item.contactname,item.zone,item.contactname,item.contactphone));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    );
}