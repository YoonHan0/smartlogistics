import { Box, Checkbox, TableCell, TableRow, Button } from "@mui/material";
import React, { useState } from "react";
import Modal4OutItem from './Modal4OutItem';
import Modal4 from "./Modal4";
const Modal4DetailItem = ({
  index,
  no,
  mcode,
  pcode,
  pname,
  psize,
  putil,
  receivecnt,
  stockcnt,
  item,
  onSave,
  onRowClick, // onRowClick 함수 추가
  clicks,
  code,
  checkedRow,
  masterStateUpdate,
  rowColor,
  setCheckedRow,
}) => {
 


  const [isEditing, setIsEditing] = useState(false);
  const [editedStockCnt, setEditedStockCnt] = useState(stockcnt);
  const [checked, setChecked] = useState(false);
  const [selectedDataArray, setSelectedDataArray] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null); // 선택된 행 데이터 추가
  const [newdata, setnewdata] = useState(null);


  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  const handleInputChange = (event) => {
    setEditedStockCnt(event.target.value);
  };


  

  const updatedCheckedRow = (e) => checkedRow.map((row) => {
    const { master, detail } = row;
    if (master === mcode) {
      // console.log('detail', detail);
      const updatedDetail = detail.map((d) => {
        console.log('code', code);
        if (d.no === code) {
          return {
            ...d,
            state: e.currentTarget.checked ? 't' : 'f',
          };
        }
        return d;
      });
      const f = updatedDetail.every(el => el.state === "t") ? "t" : "f";
      return {
        ...row,
        state: f,
        detail: updatedDetail,
      };
    }
    return row;
  });


  return (
    <TableRow
      key={no}
      sx={{
        ":hover": {
          background: "#EFF8FF",
          fontWeight: 600,
        },
        "&.Mui-selected": {
          backgroundColor: "#000",
        },
      }}
      id="searchRow"
    >
      <TableCell align="center">
      <Checkbox
            size="small"
            onChange={(e) => {
              setCheckedRow(updatedCheckedRow(e));
            }}
            checked={checkedRow.filter(row => (row.master === mcode && row.state === 't') || (row.detail.some(detail => detail.no === code && detail.state === 't'))).length > 0 ? true : false}
            disabled={checkedRow.filter(row => row.master === mcode && row.state === "t" && !row.detail.every(item => item.state === "t")).length > 0 ? true : false}
        />
      </TableCell>
      <TableCell>{index}</TableCell>
      <TableCell>{pcode}</TableCell>
      <TableCell>{pname}</TableCell>
      <TableCell>{psize}</TableCell>
      <TableCell>{putil}</TableCell>
      <TableCell>{receivecnt}</TableCell>
      <TableCell>
      {stockcnt}
</TableCell>
      <Button onClick={() => {clicks({no, mcode, pcode, pname, stockcnt, checked: false})}}>저장</Button>
    </TableRow>
  );
};
export default Modal4DetailItem;
