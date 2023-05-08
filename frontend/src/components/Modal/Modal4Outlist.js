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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import React from "react";
import Modal4DetailItem from "./Modal4DetailItem";
import checkImg from "../../assets/img/checkmark.png";
import Modal4OutItem from "./Modal4OutItem";
/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 50.5px;
  }
`;
const Modal4Outlist = ({ outdtail, modal4outlistDetail,selectedRowData,data, deleteChulgo, chulgoItemOnChangeCheck}) => {
  console.log(outdtail)
  console.log("==== data ==== ")
  console.log(data);
  
  

  // const dataa =Object.assign(data);
  // console.log(dataa);
  // const dataas = [dataa];
  // console.log(dataas);
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
          추가된 출고 리스트
        </span>
      </Box>
        <Button  onClick={() => {deleteChulgo();}}><strong>삭제</strong></Button>
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
              width: "49%",
              paddingLeft: 3,
              paddingTop: 0,
              boxShadow: "none",
              height: 180,
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
                  />  
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    입고번호
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    품번
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    품명
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    출고할잔량
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {data.length > 0 ? (
                  data.map((datas) => (
                    <Modal4OutItem
                        key={datas.no}
                        no={datas.no}
                        mcode={datas.mcode}
                        pcode={datas.pcode}
                        pname={datas.pname}
                        stockcnt={datas.stockcnt}
                        selectedRowData={selectedRowData} // 수정된 부분
                        checked={datas.checked}
                        chulgoItemOnChangeCheck={chulgoItemOnChangeCheck}
                      />
                  ))
                ) : (
                    <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                    등록된 품목이 없습니다.
                  </TableCell>
                </TableRow>
              )}
              {/* {Object.keys(data).length > 0 ? (
                // Object.values(data).map((data) => {
                      <Modal4OutItem
                        key={data.no}
                        mcode={data.mcode}
                        pcode={data.pcode}
                        pname={data.pname}
                        stockcnt={data.stockcnt}
                        selectedRowData={selectedRowData} // 수정된 부분
                      />
                            //  })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                    등록된 품목이 없습니다.
                  </TableCell>
                </TableRow>
              )} */}
              </TableBody>
            </Table>
          </TableContainer>
        </FormControl>
      </Box>
    </Grid>
  );
};
export default Modal4Outlist;
