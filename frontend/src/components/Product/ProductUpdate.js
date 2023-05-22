import {
  Box,
  Button,
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from '@mui/material';
import { border } from '@mui/system';
import React, { useEffect, useState } from 'react';

export default function ProductUpdate({ itemUpdateHandler, productDetail, item, setItem }) {
  const [target, setTarget] = useState();

  useEffect(() => {
    setTarget(productDetail.code);

    setItem({
      code: productDetail.code,
      name: productDetail.name,
      size: productDetail.size,
      unit: productDetail.unit,
    });
    return () => {};
  }, [productDetail]);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setItem({ ...item, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    itemUpdateHandler(item, target);
  };
  return (
    <Grid
      item
      xs={4}
      // boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      sx={{
        padding: 3,
        backgroundColor: '#FFF',
        borderRadius: '8px',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <span
        style={{
          fontSize: '18px',
          fontWeight: 800,
        }}
      >
        상세보기
      </span>

      <TableContainer sx={{ marginTop: 3 }}>
        <Table size="small" sx={{ width: '100%' }}>
          <TableBody>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ backgroundColor: '#F6F7F9', width: '50%', textAlign: 'center', fontWeight: '800' }}
              >
                품번
              </TableCell>

              <TableCell align="left">
                <TextField
                  type="text"
                  name="code"
                  size="small"
                  value={item.code || ''}
                  disabled
                  InputProps={{ sx: { height: 30, width: 260 } }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ backgroundColor: '#F6F7F9', textAlign: 'center', fontWeight: '800' }}>
                품명
              </TableCell>

              <TableCell align="left" sx={{ display: 'flex' }}>
                <TextField
                  type="text"
                  name="name"
                  value={item.name || ''}
                  onChange={changeHandler}
                  size="small"
                  InputProps={{ sx: { height: 30, width: 260 } }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ backgroundColor: '#F6F7F9', textAlign: 'center', fontWeight: '800' }}>
                규격
              </TableCell>

              <TableCell align="left" sx={{ display: 'flex' }}>
                <TextField
                  type="text"
                  name="size"
                  value={item.size || ''}
                  onChange={changeHandler}
                  size="small"
                  InputProps={{ sx: { height: 30, width: 260 } }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ backgroundColor: '#F6F7F9', textAlign: 'center', fontWeight: '800' }}>
                단위
              </TableCell>

              <TableCell align="left" sx={{ display: 'flex' }}>
                <TextField
                  type="text"
                  name="unit"
                  value={item.unit || ''}
                  onChange={changeHandler}
                  size="small"
                  InputProps={{ sx: { height: 30, width: 260 } }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button type="submit" variant="outlined" sx={{ marginTop: 2, width: '100%' }} onClick={onSubmitHandler}>
        수정
      </Button>
      {/* </FormControl> */}
    </Grid>
  );
}
