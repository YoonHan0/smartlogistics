import React, { useRef, useState } from "react";
import Useritem from "./Useritem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import {
  Box,
  Checkbox,
  FormControl,
  NativeSelect,
  Paper,
  TextField,
  Grid,
  Modal,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserItem from "./Useritem";
import AddIcon from "@mui/icons-material/Add";
import RegisterModal from "./Register";

/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 50.5px;
  }
`;

const UserList = ({
  users,
  userDetail,
  deleteItemHandler,
  itemAddHandler,
  setItem,
  setDetail,
}) => {
  const [checkedButtons, setCheckedButtons] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  /**scroll 미완 */
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
    console.log(event.currentTarget.scrollTop);
  };

  /** Delete를 체크박스 Handler  */
  const changeHandler = (checked, id) => {
    checked
      ? setCheckedButtons((prev) => [...prev, id])
      : setCheckedButtons((prev) => prev.filter((el) => el !== id));
    if (!checked) {
      setIsChecked(false);
    }
    if (checked) {
      if (!isChecked) {
        users.length === checkedButtons.length + 1
          ? setIsChecked((prev) => !prev)
          : null;
      }
    }
  };
  /** 모두 선택해주는 체크박스 */
  const allCheckBox = (e) => {
    if (!isChecked) {
      setIsChecked(e.target.checked);

      const data = users.map((el) => el.id);
      console.log(data);
      setCheckedButtons(data);
    } else {
      setIsChecked(e.target.checked);
      setCheckedButtons([]);
    }
  };
  //삭제 모달 관련
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setDetail([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalMessage = () => {
    const length = checkedButtons.length;
    if (isChecked) {
      return "유저 전체를 삭제하시겠습니까?";
    }
    if (length === 0) {
      return "선택한 데이터가 없습니다.";
    }
    if (length === 1) {
      return checkedButtons[0] + "을 삭제하시겠습니까?";
    }
    return length + "명의 유저를 삭제하시겠습니까?";
  };

  const onDeleteButton = () => {
    deleteItemHandler(checkedButtons);
    setCheckedButtons([]);
    setIsChecked(false);
    setItem({ id: "", name: "", phone: "" });
    handleClose();
  };

  //회원가입 모달
  const [registerOpen, setRegisterOpen] = useState(false);
  const handleRegisterOpen = () => {
    setDetail([]);
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  //체크박스 관련
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
    setDetail([]);
  };

  return (
    <Grid
      item
      xs={8}
      sx={{
        width: "100%",
        height: "730px",
        marginRight: 4,
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 230,
            height: 110,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 5,
            p: 3,
          }}
        >
          <Box
            variant="h6"
            sx={{
              fontSize: "20px",
              mb: "20px",
            }}
          >
            삭제
          </Box>
          <Box
            sx={{
              fontSize: "13px",
              mb: "20px",
            }}
          >
            {modalMessage()}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {checkedButtons.length === 0 ? undefined : (
              <Button onClick={onDeleteButton}>확인</Button>
            )}
            <Button onClick={handleClose}>취소</Button>
          </Box>
        </Box>
      </Modal>

      <RegisterModal
        open={registerOpen}
        onClose={handleRegisterClose}
        itemAddHandler={itemAddHandler}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "97%",
            display: "table-column-group",
            textAlign: "right",
          }}
        >
          <AddIcon
            sx={{ padding: "7px", cursor: "pointer", marginLeft: "auto" }}
            onClick={handleRegisterOpen}
          />
          <DeleteIcon
            sx={{ padding: "7px", cursor: "pointer", marginLeft: "auto" }}
            onClick={handleOpen}
          />
        </Box>

        <FormControl component="form">
          <TableContainer
            component={Paper}
            sx={{
              width: "94%",
              padding: 3,
              paddingTop: 0,
              boxShadow: "none",
              height: 550,
            }}
            onScroll={handleScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: "10%",
                      backgroundColor: "#F6F7F9",
                      textAlignLast: "center",
                    }}
                  >
                    <Checkbox
                      size="small"
                      onChange={(e) => {
                        allCheckBox(e);
                      }}
                      checked={isChecked}
                    />
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    번호
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>ID</TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    이름
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    연락처
                  </TableCell>
                </TableRow>
                <TableRow sx={{ height: 2, p: 0 }}></TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <UserItem
                      key={index}
                      no={index}
                      id={user.id}
                      name={user.name}
                      phone={user.phone}
                      userDetail={userDetail}
                      checkedButtons={checkedButtons}
                      changeHandler={changeHandler}
                      handleCheckboxClick={handleCheckboxClick}
                    />
                  ))
                ) : (
                  <TableRow key={users.length}>
                    <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                      등록된 계정이 존재하지 않습니다.
                    </TableCell>
                  </TableRow>
                )}{" "}
                {/* 어차피 admin 계정은 처음에 무조건 존재하니까 "등록된 계정이 존재하지 않습니다." 이 부분은 필요가 없지 않을까요*/}
              </TableBody>
            </Table>
          </TableContainer>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default UserList;
