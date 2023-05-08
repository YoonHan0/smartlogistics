import React, { useRef, useState } from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";

const ProductItem = ({
  no,
  code,
  name,
  size,
  unit,
  productDetail,
  checkedButtons,
  changeHandler,
}) => {
  const refCode = useRef(null);
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
      onClick={() => {
        productDetail(code || "");
      }}
    >
      <TableCell align="center" sx={{ p: 0 }}>
        <Checkbox
          size="small"
          onChange={(e) => {
            //console.log(`출력: ${(e.currentTarget.checked, code)}`);
            changeHandler(e.currentTarget.checked, code);
          }}
          checked={checkedButtons.includes(code) ? true : false}
        />
      </TableCell>
      <TableCell>{no + 1}</TableCell>
      <TableCell id="code" ref={refCode}>
        {code}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{size}</TableCell>
      <TableCell>{unit}</TableCell>
    </TableRow>
  );
};

export default ProductItem;