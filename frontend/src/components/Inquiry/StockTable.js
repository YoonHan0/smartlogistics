import React from 'react';
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
          <TableRow sx={{
            bgcolor: 'rgba(235, 207, 197, 0.2)',
            border: '1px solid #000',
            borderRadius: '10px'
          }}>
            <TableCell>2022-08-06</TableCell>
            <TableCell>RV2305000011</TableCell>  
            <TableCell>담당자이름</TableCell>
            <TableCell>거래처이름</TableCell>
            <TableCell>I-006</TableCell>
            <TableCell>배</TableCell>
            <TableCell>small</TableCell>
            <TableCell>EA</TableCell>
            <TableCell>100</TableCell>
            <TableCell>100</TableCell>
            <TableCell> </TableCell>
            <TableCell>200</TableCell>
          </TableRow>
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