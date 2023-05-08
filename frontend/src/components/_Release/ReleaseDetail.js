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
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import DetailItem from "./DetailItem";
import checkImg from "../../assets/img/checkmark.png";
import SearchIcon from "@mui/icons-material/Search";
import DeleteDetailModal from "../Modal/DeleteDetailModal";
import NullModal from "../Modal/NullModal";

/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 43px;
    p: 0;
    height: 30px;
  }
`;

const ReleaseDetail = ({ 
    details, 
    checkedRow,
    setCheckedRow,
    toggleModal,
    deleteDetailHandler,
    openDeleteModalInDetail,
    setOpenDeleteModalInDetail
  }) => {
    
    // checkedRow에 detail 프로퍼티가 없어서 에러가 계속 발생 -> filter로 detail 프로퍼티가 존재하는지 먼저 거르고 시작
    const filteredRow = checkedRow.filter(row => row.detail !== undefined);
    const filteredDetails = filteredRow
      .filter(row => row.master === details[0].masterCode,) // master 코드가 같은 것 / flatMap: 배열 내 요소들을 변환하고, 각 변환된 배열 요소를 하나의 배열로 합치는 함수
      .flatMap(row => row.detail.filter(detail => detail.state === 't' && detail.no !== ''))
      .map(detail => detail.no);

    const deleteObj = {
      no: filteredDetails,    // checkedRow의 detail 프로퍼티에서 state값이 "t"인 데이터의 no값
      masterCode: details[0].masterCode,  // 화면에 표시되는 detail List들의 공통된 master code값
      length: details.length  // 화면에 표시되는 detail List들의 길이
    }

    const [openNullModal, setOpenNullModal] = useState(false);  // 삭제할 것인지 확인하는 모달창
    

    /** 모두 선택해주는 체크박스 (detail header부분의 체크박스) */
    const detailAllCheckBox = (checked) => {
      const updatedCheckedRow = checkedRow.map((row) => {
        if (row.master === details[0].masterCode) {
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

    /** detail All Check를 위한 객체 */
    const filteredRows = checkedRow.filter(row =>
      row.detail.some(detail => 
        details.some(item => item.no === detail.no && detail.state === 't')
      )
    );
  
    return (
      <Grid
        item
        xs={12}
        sx={{
          width: "100%",
          height: 360,
          backgroundColor: "#FFF",
          borderRadius: "8px",
          boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", paddingLeft: 3, width: "94%" }}>
          <Box
            component="img"
            src={checkImg}
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
          <span
            style={{
              position: "relative",
              fontSize: "16px",
              fontWeight: 800,
              marginRight: "15px",
              marginTop: "5px",
              marginLeft: "10px",
            }}
          >
            품목리스트
          </span>
          <DeleteIcon
            sx={{
              padding: "7px",
              cursor: "pointer",
              marginLeft: "auto",
            }}
            onClick={() => {
              filteredDetails.length > 0 ? toggleModal(openDeleteModalInDetail, setOpenDeleteModalInDetail) : toggleModal(openNullModal, setOpenNullModal)
            }}
          />
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
                height: 300,
                // marginLeft: "40px",
              }}
              // onScroll={handleScroll}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "5%",
                        backgroundColor: "#F6F7F9",
                        p: 0,
                        textAlign: "center",
                      }}
                    >
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
                    <TableCell sx={{ width: "15%", backgroundColor: "#F6F7F9" }}>
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
                      진행상태
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableStickyTypeCell></TableStickyTypeCell>
                    <TableStickyTypeCell></TableStickyTypeCell>
                    <TableStickyTypeCell>
                      <Box
                        sx={{
                          p: 0,
                          border: "1px solid #C4C4C4",
                          height: "28px",
                          display: "flex",
                          width: "190px",
                          marginRight: "5px",
                          borderRadius: "4px",
                          paddingRight: "8px",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            marginLeft: "1px",
                            width: "140px",
                            height: "27px",
                            border: 0,
                          }}
                        />
                        <SearchIcon
                          sx={{ marginLeft: "auto", marginTop: "3px" }}
                        />
                      </Box>
                    </TableStickyTypeCell>
                    <TableStickyTypeCell></TableStickyTypeCell>
                    <TableStickyTypeCell></TableStickyTypeCell>
                    <TableStickyTypeCell></TableStickyTypeCell>
                    <TableStickyTypeCell></TableStickyTypeCell>
                    <TableStickyTypeCell></TableStickyTypeCell>
                    <TableStickyTypeCell></TableStickyTypeCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details && details.length && Object.keys(details[0]).length !== 0 ? (
                    details.map((detail, index) => (
                      <DetailItem
                        key={index}
                        no={index}
                        code={detail.no}
                        mcode={detail.masterCode}
                        pcode={detail.productCode}
                        pname={detail.productName}
                        psize={detail.productSize}
                        putil={detail.productUnit}
                        releasecnt={detail.count}
                        checkedRow={checkedRow}
                        setCheckedRow={setCheckedRow}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} sx={{ textAlign: "center" }}>
                        확인하려는 출고리스트를 클릭해주세요.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </FormControl>
        </Box>
        <DeleteDetailModal 
          open={openDeleteModalInDetail}
          onClose={() => setOpenDeleteModalInDetail(false)}
          checkedRow={checkedRow}
          deleteDetailHandler={deleteDetailHandler}
          data={deleteObj}
        />
        <NullModal
          open={openNullModal}
          onClose={() => setOpenNullModal(false)}
        />
      </Grid>
    );
};

export default ReleaseDetail;
