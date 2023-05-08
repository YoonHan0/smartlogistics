import React, { useRef, useState } from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";

const Useritem = ({
  key,
  no,
  id,
  name,
  password,
  phone,
  userDetail,
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
      }}
      id="searchRow"
      onClick={() => {
        console.log(id);
        userDetail(id || "");
      }}
    >
      <TableCell align="center" sx={{ p: 0 }}>
        <Checkbox
          size="small"
          onChange={(e) => {
            //console.log(`출력: ${(e.currentTarget.checked, code)}`);
            changeHandler(e.currentTarget.checked, id);
          }}
          checked={checkedButtons.includes(id) ? true : false}
        />
      </TableCell>
      <TableCell>{no + 1}</TableCell>
      <TableCell id="code" ref={refCode}>
        {id}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{password}</TableCell>
    </TableRow>
  );
};

export default Useritem;