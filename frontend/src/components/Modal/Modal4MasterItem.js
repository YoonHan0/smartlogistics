import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import React from "react";
const Modal4MasterItem = ({
  no,
  code,
  date,
  username,
  businessname,
  modal4receiveDetail,
  checkedRow,masterStateUpdate,rowColor
}) => {
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
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
      onClick={() => {
        modal4receiveDetail(code || "");
      }}
    >
      <TableCell align="center">
      <Checkbox
            size="small"
            checked={checkedRow.some(row => row.master === code && (row.state === 't' || (row.detail.length > 0 && row.detail.every(d => d.state === 't'))))}
            disabled={checkedRow.some(row => (row.master === code && row.state === "t") && row.detail.every(d => d.state === "t"))}
            onChange={(e) => {
              masterStateUpdate(e.currentTarget.checked, code);
            }}
            onClick={handleCheckboxClick}
        />
      </TableCell>
      <TableCell id="code">{code}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{businessname}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};
export default Modal4MasterItem;