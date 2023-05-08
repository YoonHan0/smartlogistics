import React, { useState, useRef } from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";

/* Ref를 사용해서 값 가져와보쟈 */
function BusinessItem({
  no,
  code,
  name,
  phone,
  businessDetail,
  checkedButtons,
  changeHandler,
}) {
  const refCode = useRef(null);

  return (
    <TableRow
      sx={{
        ":hover": {
          background: "#EFF8FF",
          fontWeight: 600,
        },
      }}
      id="searchRow"
      onClick={() => {
        businessDetail(code || "");
      }}
    >
      <TableCell align="center" sx={{ p: 0 }}>
        <Checkbox
          size="small"
          onChange={(e) => {
            console.log(`출력: ${(e.currentTarget.checked, code)}`);
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
      <TableCell>{phone}</TableCell>
    </TableRow>
  );
}

export default BusinessItem;