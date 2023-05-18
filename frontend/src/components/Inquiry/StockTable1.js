import React, { useState } from 'react';
import AutoScollTable from '../Table/AutoScollTable';
import TableHead from '../Table/TableHead';
import TableRow from '../Table/TableRow';
import TableCell from '../Table/TableCell';

import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { Box } from '@mui/material';
import TableBody from '../Table/TableBody';
import TableHeadCell from '../Table/TableHeadCell';



const StockTable1 = ({ 
  list, 
  searchKw, 
  searchKeyword, 
  setSearchKw,
  searchChk,
  setSearchChk,
  hasNextPage, 
  setHasNextPage, 
  loading,
}) => {
  const isRowLoaded = ({ index }) => !hasNextPage || index < list.length;
  const Width = ['120px', '140px', '120px', '120px', '120px', '120px', '120px', '100px', '100px', '80px', '80px', '100px'];
  // const Width = [9,3,3,3,3,3,3,3,3,3,3,3];
  // const Width =['10%','13%','10%','10%','10%','10%','10%','8%','8%','6%','6%','10%'];
  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 50,
  });

  const rowRenderer = ({ index, parent, style }) => {
    const item = list[index];
    console.log(list)
    if (!isRowLoaded({ index })) {
      return (
        <td key={index} style={style}>
          Loading...
        </td>
      );
    }

    const updatedStyleCell = (w) => Object.assign({}, style, { 
      width: w,
      padding: 0,
      height: '50px'
    });

    const updatedStyleRow = Object.assign({}, style, { 
      backgroundColor: item.state==='RV' ? 'rgba(255, 99, 132, 0.1)':'rgba(54, 162, 235, 0.1)',
    });
    return (
      <CellMeasurer
        key={index}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ measure }) => (
          <TableRow key={index} style={updatedStyleRow} >
            {/*스타일 넣어줘야 virtual render 적용됨*/}
            <TableCell style={  updatedStyleCell(Width[0]) }>
              {item.date}
              </TableCell>
              <TableCell style={  updatedStyleCell(Width[1]) }>
              {item.code}
              </TableCell>
              <TableCell style={  updatedStyleCell(Width[2]) }>
              {item.userName}
              </TableCell>
              <TableCell style={  updatedStyleCell(Width[3]) }>
              {item.businessName.length > 5 ? item.businessName.substr(0, 5) + '...' : item.businessName}
              </TableCell>
              <TableCell style={  updatedStyleCell(Width[4]) }>
              {item.productCode}
              </TableCell>
              <TableCell style={  updatedStyleCell(Width[5]) }>
              {item.productName.length > 5 ? item.productName.substr(0, 5) + '...' : item.productName}
              </TableCell>
              <TableCell style={  updatedStyleCell(Width[6]) }>
              {item.size}
              </TableCell>
              <TableCell style={  updatedStyleCell(Width[7]) }>
              {item.unit}
              </TableCell>
              <TableCell style={  updatedStyleCell(Width[8]) }>
              {item.beginningStock}
              </TableCell>
            {
              item.state === 'RV' ?
                <>
            <TableCell style={  updatedStyleCell(Width[9]) }>
                    {item.count}
                    </TableCell>
                    <TableCell style={  updatedStyleCell(Width[10]) }>
                  </TableCell>
                </> :
                <>
            <TableCell style={  updatedStyleCell(Width[9]) }>
                  </TableCell>
                  <TableCell style={  updatedStyleCell(Width[10]) }>
                    {item.count}
                    </TableCell>
                </>
            }
            <TableCell style={  updatedStyleCell(Width[11]) }>
              {item.endingStock}
              </TableCell>
          </TableRow>
        )}
      </CellMeasurer>
    );
  }

  const tableHeadStyle = {
    backgroundColor: "#F6F7F9", fontWeight: 800, border: '1px solid #000'
  }
  return (
    <Box>
      <AutoScollTable
        w={1350}
        h={500}
        list={list}
        searchKw={searchKw}
        loading={loading}
        searchKeyword={searchKeyword}
        setSearchKw={setSearchKw}
        searchChk={searchChk}
        callback={setSearchKw}
        setSearchChk={setSearchChk}
        isRowLoaded={isRowLoaded}
        rowRenderer={rowRenderer}
        hasNextPage={hasNextPage}
        setHasNextPage={setHasNextPage}>
        <TableHead>
          <TableRow>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[0] }}>
              입출고일
            </TableHeadCell>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[1] }}>
              코드
            </TableHeadCell>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[2] }}>
              담당자
            </TableHeadCell>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[3] }}>
              거래처
            </TableHeadCell>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[4] }}>
              품번
            </TableHeadCell>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[5] }}>
              품명
            </TableHeadCell>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[6] }}>
              규격
            </TableHeadCell>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[7] }}>
              단위
            </TableHeadCell>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[8] }}>
              기초재고
            </TableHeadCell>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[9] }}>
              입고
            </TableHeadCell>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[10] }}>
              출고
            </TableHeadCell>
            <TableHeadCell style={{ backgroundColor: "#F6F7F9", fontWeight: 800,  width: Width[11] }}>
              기말재고
            </TableHeadCell>
          </TableRow>
        </TableHead>

      </AutoScollTable>
    </Box>
  );
};

export default StockTable1;