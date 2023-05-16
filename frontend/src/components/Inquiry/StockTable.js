import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  NativeSelect,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import StockItem from './StockItem';




const StockTable = ({ list }) => {

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 4,
        width: "94%",
        paddingLeft: 3,
        paddingTop: 0,
        boxShadow: "none",
        height: 600,
      }}
    // onScroll={handleScroll}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow sx={{ height: 3 }}>
            <TableCell sx={{ width: "18%", backgroundColor: "#F6F7F9", fontWeight: 800 }}>
              입출고일
            </TableCell>
            <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 800 }}>
              코드
            </TableCell>
            <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 800 }}>
              담당자
            </TableCell>
            <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 800 }}>
              거래처
            </TableCell>
            <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 800 }}>
              품번
            </TableCell>
            <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 800 }}>
              품명
            </TableCell>
            <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 800 }}>
              규격
            </TableCell>
            <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 800 }}>
              단위
            </TableCell>
            <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 800 }}>
              기초재고
            </TableCell>
            <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 800 }}>
              입고
            </TableCell>
            <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 800 }}>
              출고
            </TableCell>
            <TableCell
              sx={{ width: "10%", backgroundColor: "#F6F7F9", p: 0, fontWeight: 800 }}
            >
              기말재고
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            list.length > 0 ? (
              list.map((item, index) =>
                <StockItem
                  key={index}
                  code={item.code}
                  date={item.date}
                  state={item.state}
                  user_name={item.userName}
                  business_name={item.businessName}
                  product_code={item.productCode}
                  product_name={item.productName}
                  size={item.size}
                  unit={item.unit}
                  count={item.count}
                  beginning_stock={item.beginningStock}
                  ending_stock={item.endingStock}
                />)
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center' }}>등록된 거래처가 없습니다.</TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;