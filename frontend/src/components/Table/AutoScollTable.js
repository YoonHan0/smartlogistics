import React, { useEffect, useState } from 'react';
import {
  CellMeasurerCache,
  CellMeasurer,
  InfiniteLoader,
  List,
  AutoSizer,
} from "react-virtualized";
import Table from './Table';
import TableBody from './TableBody';
const AutoScollTable = ({w, h, list, loading, isRowLoaded, rowRenderer, hasNextPage, setHasNextPage, children}) => {
  const loadMoreRows = ({ startIndex, stopIndex }) => {
    console.log("loadMoreRows:", startIndex, stopIndex);
    if (!loading && hasNextPage) {
      //   setStartIndex(startIndex);
      // searchKWDfetch(startIndex, stopIndex);
    }
  };

  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 50,
  });

  useEffect(() => {
    setHasNextPage(list.length === 10);
  },[list])
  return (
    <AutoSizer>
      {({ width, height }) => (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={hasNextPage ? list.length + 1 : list.length}
          height={height} // Use height from AutoSizer
          width={width} // Use width from AutoSizer
        >
          {({ onRowsRendered, registerChild }) => (
            <>
              <Table>
                {
                  children
                }
                <TableBody>
                  <List
                    width={w}
                    height={h}
                    rowCount={
                      hasNextPage ? list.length + 1 : list.length
                    }
                    rowHeight={cellMeasurerCache.rowHeight}
                    rowRenderer={rowRenderer}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                  />
                </TableBody>
              </Table>
            </>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default AutoScollTable;