import { TableCell, TableRow } from '@mui/material';
import React from 'react';

const StockItem = ({
  code,
  date,
  state,
  user_name,
  business_name,
  product_code,
  product_name,
  size,
  unit,
  count,
  beginning_stock,
  ending_stock
}) => {
  return (
    <TableRow sx={{
      bgcolor: state==='RV' ? 'rgba(235, 207, 197, 0.2)':'rgba(102, 131, 189, 0.2)',
      border: '1px solid #000',
      borderRadius: '10px'
    }}>
      <TableCell>{date}</TableCell>
      <TableCell>{code}</TableCell>
      <TableCell>{user_name}</TableCell>
      <TableCell>{business_name}</TableCell>
      <TableCell>{product_code}</TableCell>
      <TableCell>{product_name}</TableCell>
      <TableCell>{size}</TableCell>
      <TableCell>{unit}</TableCell>
      <TableCell>{beginning_stock}</TableCell>
      {
        state ==='RV' ?
        <>
          <TableCell>{count}</TableCell>
          <TableCell> </TableCell>
        </> :
        <>
        <TableCell> </TableCell>
        <TableCell>{count}</TableCell>
      </>        
      }
      <TableCell>{ending_stock}</TableCell>
    </TableRow>
  );
};

export default StockItem;