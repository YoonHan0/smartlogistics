import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import Modal4Outlist from "./Modal4Outlist";
import Modal4DetailItem from "./Modal4DetailItem";
const Modal4OutItem = ({
  selectedRowData, onSave, onClose,
  no,
  mcode,
  pcode,
  pname,
  psize,
  putil,
  receivecnt,
  stockcnt,
  selectedData,
  checked,
  chulgoItemOnChangeCheck,
}) => {
  
  console.log(pcode, pname, stockcnt);
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose(); // 모달 창 닫힘 상태 전달
  };
  const handleSave = () => {
    onSave && onSave(); // 저장 이벤트 전달
    handleClose();
  };
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
     //  onClick={() => {
     //    Modal4Outlist(pcode || "");
     // }}
    >
      <TableCell align="center">
        <Checkbox size="small"  onChange={(e) => {chulgoItemOnChangeCheck(no)}} checked={checked}/>
      </TableCell>
      <TableCell>{mcode}</TableCell>
      <TableCell>{pcode}</TableCell>
      <TableCell>{pname}</TableCell>
      <TableCell>{receivecnt}</TableCell>
      <TableCell >{stockcnt}</TableCell> {/* 주석은 이렇게 */}
    </TableRow>
  );
};
export default Modal4OutItem;
