import React, { useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, FormControl, TableContainer, Paper } from '@mui/material';
import StockItem from './StockItem';

const StockTable = ({ list, searchKeyword }) => {
  const handleWindowScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    // console.log('scrollTop', scrollTop)
    // console.log('clientHeight', clientHeight)
    // console.log('scrollHeight', scrollHeight)

    if (clientHeight + scrollTop + 10 > scrollHeight) {
      searchKeyword.call(this);
    }
  }

  useEffect(() => {
    const tablePro = document.getElementById('table');
    tablePro.addEventListener('scroll', handleWindowScroll);
    searchKeyword.call(this);

    return () => {
      tablePro.removeEventListener('scroll', handleWindowScroll);
    }
  }, []);


  const TableHeadStyle = {
    backgroundColor: "#F6F7F9",
    fontWeight: 800
  }
  return (
    <FormControl component="form" id='table' sx={{ h: 300 }}>
      <TableContainer
        component={Paper}
        sx={{
          width: "94%",
          
          paddingTop: 0,
          boxShadow: "none",
          height: 550,
        }}
        onScroll={handleWindowScroll}
      >
        <Table stickyHeader size="small" >
          <TableHead>
            <TableRow key='head'>
              <TableCell sx={TableHeadStyle}>
                입출고일
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                코드
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                담당자
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                거래처
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                품번
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                품명
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                규격
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                단위
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                기초재고
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                입고
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                출고
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                기말재고
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              list.map((item, index) =>
                <StockItem
                  index={index}
                  state={item.state}
                  date={item.date}
                  code={item.code}
                  userName={item.userName}
                  businessName={item.businessName}
                  productCode={item.productCode}
                  productName={item.productName}
                  size={item.size}
                  unit={item.unit}
                  beginningStock={item.beginningStock}
                  count={item.count}
                  endingStock={item.endingStock}
                />
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </FormControl>
  );
};

export default StockTable;