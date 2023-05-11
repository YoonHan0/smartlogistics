import { Box, Checkbox, TableCell, TableRow, checkboxClasses } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
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
  changeHandler,
  checkedButtons,
  data
  
}) => {
  console.log(checked)
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
  const checkboxRef = useRef(null)

  useEffect(() => {

    checked === true ? checkboxRef.current.checked = true : null;

  }, [checked]);



  console.log("뛔스트",receivecnt,stockcnt);



  
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
      {/* {chulgoItemOnChangeCheck(no); */}
      <TableCell align="center">
      <Checkbox 
        size="small" 
        id = "test" 
        name = "test" 
        // onChange={(e) => {chulgoItemOnChangeCheck(no); changeHandler(e.currentTarget.checked, no);}}  
        // checked={checkedButtons.includes(no) ? true : false} 
        onChange={(e) => {
          chulgoItemOnChangeCheck(no);
          changeHandler(e.currentTarget.checked, no);
        }}  
        checked={data.find(item => item.no===no).checked} 
        ref = {checkboxRef}
      />
      </TableCell>
      <TableCell>{mcode}</TableCell>
      <TableCell>{pcode}</TableCell>
      <TableCell>{pname}</TableCell>
      <TableCell >{stockcnt}</TableCell> {/* 주석은 이렇게 */}
    </TableRow>
  );
};
export default Modal4OutItem;
