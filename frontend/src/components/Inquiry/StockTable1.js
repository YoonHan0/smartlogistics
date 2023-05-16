import React, { useState } from 'react';
import AutoScollTable from '../Table/AutoScollTable';
import TableHead from '../Table/TableHead';
import TableRow from '../Table/TableRow';
import TableCell from '../Table/TableCell';

import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { Box } from '@mui/material';
import TableBody from '../Table/TableBody';



const StockTable1 = ({ list }) => {
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const isRowLoaded = ({ index }) => !hasNextPage || index < list.length;

  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 50,
  });

  const rowRenderer = ({ index, key, parent, style }) => {

    console.log(list)
    if (!isRowLoaded({ index })) {
      return (
        <div key={key} style={style}>
          Loading...
        </div>
      );
    }
    const updatedStyle = Object.assign({}, style, {
      // bgcolor: state==='RV' ? 'rgba(255, 99, 132, 0.1)':'rgba(54, 162, 235, 0.1)',
      borderRadius: '10px'
    });
    return (
      <CellMeasurer
        key={key}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ measure }) => (
          <TableRow style={updatedStyle} key={list[index].code}>
            {/*스타일 넣어줘야 virtual render 적용됨*/}
            <TableCell style={{ border: '1px solid #000' }}>
              {list[index].date}</TableCell>
            <TableCell style={{ border: '1px solid #000' }}>
              {list[index].code}</TableCell>
            <TableCell style={{ border: '1px solid #000' }}>
              {list[index].userName}</TableCell>
            <TableCell style={{ border: '1px solid #000' }}>
              {list[index].businessName.length > 5 ? list[index].businessName.substr(0, 5) + '...' : list[index].businessName}</TableCell>
            <TableCell style={{ border: '1px solid #000' }}>
              {list[index].productCode}</TableCell>
            <TableCell style={{ border: '1px solid #000' }}>
              {list[index].productName.length > 5 ? list[index].productName.substr(0, 5) + '...' : list[index].productName}</TableCell>
            <TableCell style={{ border: '1px solid #000' }}>
              {list[index].size}</TableCell>
            <TableCell style={{ border: '1px solid #000' }}>
              {list[index].unit}</TableCell>
            <TableCell style={{ border: '1px solid #000' }}>
              {list[index].beginningStock}</TableCell>
            {
              list[index].state === 'RV' ?
                <>
                  <TableCell style={{ border: '1px solid #000' }}>
                    {list[index].count}</TableCell>
                  <TableCell style={{ border: '1px solid #000' }}>
                  </TableCell>
                </> :
                <>
                  <TableCell style={{ border: '1px solid #000' }}>
                  </TableCell>
                  <TableCell style={{ border: '1px solid #000' }}>
                    {list[index].count}</TableCell>
                </>
            }
            <TableCell style={{ border: '1px solid #000' }}>
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
        w={1500}
        h={500}
        list={list}
        loading={loading}
        isRowLoaded={isRowLoaded}
        rowRenderer={rowRenderer}
        hasNextPage={hasNextPage}
        setHasNextPage={setHasNextPage}>
        <TableHead>
          <TableRow>
            <TableCell style={tableHeadStyle}>
              입출고일
            </TableCell>
            <TableCell style={tableHeadStyle}>
              코드
            </TableCell>
            <TableCell style={tableHeadStyle}>
              담당자
            </TableCell>
            <TableCell style={tableHeadStyle}>
              거래처
            </TableCell>
            <TableCell style={tableHeadStyle}>
              품번
            </TableCell>
            <TableCell style={tableHeadStyle}>
              품명
            </TableCell>
            <TableCell style={tableHeadStyle}>
              규격
            </TableCell>
            <TableCell style={tableHeadStyle}>
              단위
            </TableCell>
            <TableCell style={tableHeadStyle}>
              기초재고
            </TableCell>
            <TableCell style={tableHeadStyle}>
              입고
            </TableCell>
            <TableCell style={tableHeadStyle}>
              출고
            </TableCell>
            <TableCell style={tableHeadStyle}>
              기말재고
            </TableCell>
          </TableRow>
        </TableHead>

      </AutoScollTable>
    </Box>
  );
};

export default StockTable1;