import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  NativeSelect,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  checkcode,
  handleSingleCheck,
  checkItems,
  data,
  button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import React, { useState } from "react";
import Modal4DetailItem from "./Modal4DetailItem";
import checkImg from "../../assets/img/checkmark.png";
/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 43px;
    p: 0;
    height: 30px;
  }
`;
const Modal4ReceiveDetail = ({ details, clicks, checkedRow, setCheckedRow, multiClicks }) => {
  details[0] !== undefined ? console.log("1111",details[0].masterCode) : null;
const detailAllCheckBox = (checked) => {
  const updatedCheckedRow = checkedRow.map((row) => {
    if (details.length > 0 && row.master === details[0].masterCode) {
      const updatedDetail = row.detail.map((detail) => {
        return { ...detail, state: checked ? 't' : 'f' };
      });
      return {
        ...row,
         state: checked ? 't' : 'f',
        detail: updatedDetail,
      };
    }
    return row;
  });
  setCheckedRow(updatedCheckedRow);
}
const filteredRows = checkedRow.filter(row =>
  row.detail.some(detail =>
    details.some(item => item.no === detail.no && detail.state === 't')
  )
);

console.log('filteredRows',filteredRows )
console.log('details', details);

  return (
    <Grid
      item
      xs={12}
      sx={{
        width: "100%",
        height: 230,
        // position: "relative",
        backgroundColor: "#FFF",
        borderRadius: "25px",
      }}
    >
      <Box sx={{ display: "flex", paddingLeft: 3, width: "94%" }}>
        <span
          style={{
            position: "relative",
            fontSize: "16px",
            fontWeight: 800,
            marginRight: "15px",
            marginTop: "5px",
            marginLeft: "2px",
          }}
        >
          품목리스트
        </span>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <FormControl component="form">
          <TableContainer
            component={Paper}
            sx={{
              width: "94%",
              paddingLeft: 3,
              paddingTop: 0,
              boxShadow: "none",
              height: 200,
              // marginLeft: "40px",
            }}
            // onScroll={handleScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "5%", backgroundColor: "#F6F7F9" }}>
                    <Checkbox
                      size="small"
                      onChange={(e) => {
                        detailAllCheckBox(e.currentTarget.checked);
                      }}
                      checked={(details.length === (filteredRows[0] !== undefined && filteredRows[0].detail.filter((el) => el.state === "t").length)) || (checkedRow.some(row => row.master === details?.[0]?.masterCode && row.state === 't'))}
                      disabled={checkedRow.filter(row => row.master === details?.[0]?.masterCode && row.state === "t" && !row.detail.every(item => item.state === "t")).length > 0 ? true : false}
                      />
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    순번
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    품번
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    품명
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    규격
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    단위
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    수량
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    출고할잔량
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    선택
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details.length > 0 ? (
                  details.map((detailss, index) => (
                    <Modal4DetailItem
                      key={index}
                      index={index}
                      no={detailss.no}
                      mcode={detailss.masterCode}
                      pcode={detailss.productCode}
                      pname={detailss.productName}
                      psize={detailss.productSize}
                      putil={detailss.productUnit}
                      receivecnt={detailss.receiveCount}
                      stockcnt={detailss.stockCount}
                      code={detailss.no}
                      clicks={clicks}
                      checkedRow={checkedRow}
                      setCheckedRow={setCheckedRow}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} sx={{ textAlign: "center" }}>
                      등록된 품목이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 3 }}>
        <Button
            sx={{
              mt: 2,
              color: "#41719C",
              border: "2px solid #41719C",
              borderRadius: "5px",
              ":hover": {
                color: "#fff",
                backgroundColor: "#41719C",
              },
              height: "40px",
            }}
            onClick={() => {multiClicks(details)}}
          ><strong>추가</strong></Button>
    </Box>
      </Box>
    </Grid>
  );
};
export default Modal4ReceiveDetail;
