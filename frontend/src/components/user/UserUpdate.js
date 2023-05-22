import {
  Box,
  Button,
  FormControl,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import sha256 from "sha256";

export default function UserUpdate({
  itemUpdateHandler,
  userDetail,
  item,
  setItem,
}) {
  const [target, setTarget] = useState();

  useEffect(() => {
    setTarget(userDetail.id);
    console.log(userDetail);
    setItem({
      id: userDetail.id,
      name: userDetail.name,
      phone: userDetail.phone,
    });
  }, [userDetail]);

  const changeHandler = (e) => {
    let { value, name } = e.target;
    if (name === "phone") {
      if (value.length > 13) {
        return;
      }
      value = value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "");
    }
    setItem({ ...item, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const obj = { ...item };
    if (obj.password !== undefined) {
      obj.password = sha256(obj.password);
    }
    itemUpdateHandler(obj, target);
    setItem({ code: "", name: "", phone: "" }); // update form data 초기화
  };
  return (
    <Grid
      item
      xs={4}
      sx={{
        padding: 3,
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: 800,
        }}
      >
        상세보기
      </span>
      <FormControl
        component="form"
        onSubmit={onSubmitHandler}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 3,
        }}
      >
        <TableContainer>
          <Table size="small" sx={{ width: "100%" }}>
            <TableBody>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ backgroundColor: "#F6F7F9" }}
                >
                  아이디
                </TableCell>

                <TableCell align="left">
                  <TextField
                    disabled
                    type="text"
                    id="id"
                    name="id"
                    variant="outlined"
                    size="small"
                    InputProps={{ sx: { height: 30, width: 300 } }}
                    value={item.id || ""}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ backgroundColor: "#F6F7F9" }}
                >
                  이름
                </TableCell>

                <TableCell align="left" sx={{ display: "flex" }}>
                  <TextField
                    type="text"
                    id="name"
                    name="name"
                    size="small"
                    InputProps={{ sx: { height: 30, width: 300 } }}
                    onChange={changeHandler}
                    value={item.name || ""}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "200px", backgroundColor: "#F6F7F9" }}
                >
                  전화번호
                </TableCell>

                <TableCell align="left" sx={{ display: "flex" }}>
                  <TextField
                    type="text"
                    id="phone"
                    name="phone"
                    size="small"
                    value={item.phone || ""}
                    onChange={changeHandler}
                    InputProps={{ sx: { height: 30, width: 300 } }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ backgroundColor: "#F6F7F9" }}
                >
                  비밀번호
                </TableCell>

                <TableCell align="left" sx={{ display: "flex" }}>
                  <TextField
                    type="password"
                    id="password"
                    name="password"
                    variant="outlined"
                    size="small"
                    InputProps={{ sx: { height: 30, width: 300 } }}
                    value={item.password || ""}
                    onChange={changeHandler}
                    placeholder="영어,숫자 포함 최소 9자~최대20자"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          type="submit"
          variant="outlined"
          sx={{ marginTop: 2, width: "100%" }}
        >
          수정
        </Button>
      </FormControl>
    </Grid>
  );
}
