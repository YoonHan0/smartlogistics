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
} from "@mui/material";
import styled from "styled-components";
import React from "react";
import Modal4MasterItem from "./Modal4MasterItem";
import checkImg from "../../assets/img/checkmark.png";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 43px;
  }
`;
const Modal4ReceiveMaster = ({ masters, modal4receiveDetail,checkedRow,
  setCheckedRow,rowColor }) => {

    
    const masterAllCheckBox = (checked) => {
      
      const updatedCheckedRow = checkedRow.map(row => {
        return {
          ...row,
          state: checked ? 't' : 'f',
        };
      });
      setCheckedRow(updatedCheckedRow);
    }
    /** 체크박스 클릭 시 master state의 값을 true, false로 변경해주는 함수 */
    const masterStateUpdate = (checked, code) => {
      setCheckedRow(checkedRow.map((row) => {
        if (row.master === code) {
          const newState = checked ? 't' : 'f';
          const newDetail = checked ? row.detail : row.detail.map(d => ({ ...d, state: 'f' }));
          return {
            ...row,
            state: newState,
            detail: newDetail,
          };
        } else {
          return row;
        }
      }));
    }


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
         marginBottom: 0,
        // boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: "flex", paddingLeft: 0, width: "94%" ,marginBottom:1}}>
      <Box
          component="img"
          src={checkImg}
          sx={{
            width: '30px',
            height: '30px',
          }}
        />
        <span
          style={{
            position: "relative",
            fontSize: "16px",
            fontWeight: 800,
            marginRight: "15px",
            marginTop: "5px",
            marginLeft: "2px",
            height: 30
          }}
        >
        입고리스트
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
              width: "100%",
              marginBottom:2,
              paddingTop: 0,
              boxShadow: "none",
              height: 157,
              // marginLeft: "40px",
            }}
            // onScroll={handleScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
              {/* <span
          style={{
            position: "relative",
            fontSize: "16px",
            fontWeight: 800,
            marginRight: "15px",
            marginTop: "5px",
            marginLeft: "2px",
          }}
        >
          입고리스트
        </span> */}
                <TableRow sx={{ height: 3 }}>
                  <TableCell sx={{ width: "5%", backgroundColor: "#F6F7F9", p:0, }}>
                    <Checkbox size="small"
                    onChange={(e) => {
                      masterAllCheckBox(e.currentTarget.checked);
                    }}
                    checked={checkedRow.every((row) => row.state === 't')} />
                  </TableCell>
                  <TableCell sx={{width: "10%", backgroundColor: "#F6F7F9" }}>
                    입고번호
                  </TableCell>
                  <TableCell sx={{  width: "10%",backgroundColor: "#F6F7F9" }}>
                    입고일
                  </TableCell>
                  <TableCell sx={{  width: "10%",backgroundColor: "#F6F7F9" }}>
                    담당자
                  </TableCell>
                  <TableCell sx={{  width: "10%",backgroundColor: "#F6F7F9" }}>
                    거래처
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {masters.length > 0 ? (
                  masters.map((master, index) => (
                    <Modal4MasterItem
                      key={index}
                      no={index}
                      code={master.code}
                      date={master.date}
                      username={master.userName}
                      businessname={master.businessName}
                      modal4receiveDetail={modal4receiveDetail}
                      checkedRow={checkedRow}
                      setCheckedRow={setCheckedRow}
                      masterStateUpdate={masterStateUpdate}
                      rowColor={rowColor}
                      state={master.state}
                      
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                      등록된 품목이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </FormControl>
      </Box>
    </Grid>
  );
};
export default Modal4ReceiveMaster;