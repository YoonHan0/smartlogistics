import { TextField,Box, Checkbox, TableCell, TableRow, checkboxClasses } from "@mui/material";
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
  receiveCode,
  checked,
  chulgoItemOnChangeCheck,
  changeHandler,
  checkedButtons,
  data,
  setData,
  outdetails,
  mcode1,
  updateReceiveCnt,
  pcode1,
  
}) => {
  console.log(mcode);
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


  const handleBlur = () => {
    updateReceiveCnt(count,no);
    console.log("테에스트",count,no);
  }

  console.log("뛔스트",receivecnt,stockcnt);

 const [count, setCount] = useState(stockcnt);

  const onChangeCnt=(e)=>{
    const updatedData = data.map((item) => {
      if (item.no === no) {
        return {
          ...item,
          releaseCnt: e.target.value
        };
      }
    });
    setData(updatedData)
    updatedData.map((a)=>{console.log("0000000", a)})
    }


//  const handleInputChange = (e) => {
//   handleInputChanges(no, e.target.value);
// };

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
      <TableCell  sx={{ p: 0 }}>
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
        checked={data && data.find(item => item.no === no)?.checked}
        // disabled={no? true : false}
        
        ref = {checkboxRef}
      />
      </TableCell>
      <TableCell>{mcode}</TableCell>
      <TableCell>{receiveCode||""}</TableCell>
      <TableCell>{pcode}</TableCell>
      <TableCell>{pname}</TableCell>
      <TableCell >{stockcnt}</TableCell> {/* 주석은 이렇게 */}
      <TableCell >
      <TextField
        type="number"
        id='releaseCnt'
        name='releaseCnt'
        placeholder={stockcnt}
        onChange={(e) => {onChangeCnt(e)}}
        InputProps={{
          sx: { height: 30 },
          inputProps: { min: 0, max: stockcnt},
        }}
 
></TextField>
</TableCell>
    </TableRow>
  );
};
export default Modal4OutItem;
