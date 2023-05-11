import { Box, Checkbox, TableCell, TableRow, Button,TextField } from "@mui/material";
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
  onRowClick, 
  clicks,
  code,
  checkedRow,
  masterStateUpdate,
  rowColor,
  setCheckedRow,
  data,
  setData,
  textClick,
  modal4receiveDetail,
  setreceiveDetail,
  updateReceiveCnt 
}) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedStockCnt, setEditedStockCnt] = useState(stockcnt);
  const [checked, setChecked] = useState(false);
  const [selectedDataArray, setSelectedDataArray] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null); // 선택된 행 데이터 추가
  const [newdata, setnewdata] = useState(null);
  const [count, setCount] = useState(stockcnt);
  const [clickedItems,setClickedItems] = useState();


  // const isDuplicateNo = clickedItems.some(item => item.no === no);
  
  
  // const handleDoubleClick = () => {
  //   setIsEditing(true);
  // };
  // const handleInputChange = (event) => {
  //   setEditedStockCnt(event.target.value);
  // };


    // console.log("데이따따따잇",modal4receiveDetail);

  // const updateReceiveCnt = (count,no) => {
  //   const updatedData = modal4receiveDetail.map((item) => {
  //     if (item.no === no) {
  //       return {
  //         ...item,
  //         stockcnt: count
  //       };
  //     }
  //     return item;
  //   });
  //   setreceiveDetail(updatedData);


  //   console.log("업데이또",updatedData)
  //   console.log("업데이또 체크",count,no)
  //   console.log("업데이또 데이터 체크",modal4receiveDetail)
  // };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReceiveCnt(count,no);
    console.log("테에스트",count,no);
  }

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

  // const updateStockCount = (no, count) => {
  //   const updatedData = data.map((item) => {
  //     if (item.no === no) {
  //       return {
  //         ...item,
  //         stockcnt: count
  //       };
  //     }
  //     return item;
  //   });
  //   setData(updatedData);
  // };


  
console.log("값이여라",clickedItems);
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
      <TableCell><TextField
          type="number"
          id="receivecnt"
          name="receivecnt"
          placeholder={stockcnt}
          onChange={(e) => {
            setCount(e.target.value)
          }}
          onKeyPress={handleKeyDown}
          InputProps={{ sx: { height: 30 }, inputProps: { min: 0 } }}
        ></TextField></TableCell>
          <Button onClick={() => {
            // const isDuplicateNo = clickedItems.some(item => item.no === no);
          if ( receivecnt >= stockcnt) {
             // 중복된 no가 있거나 receivecnt가 stockcnt 이상인 경우 함수를 실행하지 않음
          clicks({no, mcode, pcode, pname, putil,receivecnt, stockcnt, checked: false});
        }
          }}>저장</Button>
    </TableRow>
  );
};
export default Modal4DetailItem;
