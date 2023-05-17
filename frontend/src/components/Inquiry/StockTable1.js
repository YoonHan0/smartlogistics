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
  const Width = ['100px', '120px', '100px', '100px', '100px', '100px', '100px', '80px', '80px', '60px', '60px', '80px'];
  // const Width = [9,3,3,3,3,3,3,3,3,3,3,3];
  // const Width =['10%','13%','10%','10%','10%','10%','10%','8%','8%','6%','6%','10%'];
  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 50,
  });

  const rowRenderer = ({ index, parent }) => {

    console.log(list)
    if (!isRowLoaded({ index })) {
      return (
        <td key={index}>
          Loading...
        </td>
      );
    }
    return (
      <CellMeasurer
        key={index}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ measure }) => (
          <TableRow key={index} style={ {
            backgroundColor: list[index].state==='RV' ? 'rgba(255, 99, 132, 0.1)':'rgba(54, 162, 235, 0.1)',
            borderRadius: '10px',
          }} >
            {/*스타일 넣어줘야 virtual render 적용됨*/}
            <TableCell style={{  width: Width[0] }}>
              {list[index].date}</TableCell>
            <TableCell style={{  width: Width[1] }}>
              {list[index].code}</TableCell>
            <TableCell style={{  width: Width[2] }}>
              {list[index].userName}</TableCell>
            <TableCell style={{  width: Width[3] }}>
              {list[index].businessName.length > 5 ? list[index].businessName.substr(0, 5) + '...' : list[index].businessName}</TableCell>
            <TableCell style={{  width: Width[4] }}>
              {list[index].productCode}</TableCell>
            <TableCell style={{  width: Width[5] }}>
              {list[index].productName.length > 5 ? list[index].productName.substr(0, 5) + '...' : list[index].productName}</TableCell>
            <TableCell style={{  width: Width[6] }}>
              {list[index].size}</TableCell>
            <TableCell style={{  width: Width[7] }}>
              {list[index].unit}</TableCell>
            <TableCell style={{  width: Width[8] }}>
              {list[index].beginningStock}</TableCell>
            {
              list[index].state === 'RV' ?
                <>
                  <TableCell style={{  width: Width[9] }}>
                    {list[index].count}</TableCell>
                  <TableCell style={{  width: Width[10] }}>
                  </TableCell>
                </> :
                <>
                  <TableCell style={{  width: Width[9] }}>
                  </TableCell>
                  <TableCell style={{  width: Width[10] }}>
                    {list[index].count}</TableCell>
                </>
            }
            <TableCell style={{  width: Width[11] }}>
              {list[index].endingStock}</TableCell>
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