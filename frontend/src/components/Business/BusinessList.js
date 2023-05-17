import React, { useRef, useState, useEffect } from "react";
import BusinessItem from "./BusinessItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField, Box, FormControl, Checkbox, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { customFetch } from "../custom/customFetch";

/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 50.5px;
  }
`;

/** 조건에 맞는 리스트 주르륵 출력 */
function List({
  businesses,
  setBusinesses,
  fetchBusinessList,
  businessDetail,
  setItem,
  searchEvent,
}) {
  // const [newDatas, setNewDats] = useState({code: '', name:'', phone:''});
  /** fetch, 즉 list를 출력하기 위한 state */
  const refForm = useRef(null);
  /** Delete를 위한 체크박스 State */
  const [checkedButtons, setCheckedButtons] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [codeChk, setCodeChk] = useState();
  /**  submit하기위한 check여부 */
  const isCheck = useRef(true);
  const [phone, setPhone] = useState("");
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.length > 13) {
      return;
    }
    setPhone(
      value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
    );
  };

  /** form 데이터를 관리하기 위한 state */
  const [data, setData] = useState({});
  // =================================== DELETE =======================================
  /** delete 체크박스 Handler  */
  const changeHandler = (checked, code) => {
    checked
      ? setCheckedButtons([...checkedButtons, code])
      : // 클릭된 'code'랑 같으면 제거해서 새로운 배열을 만듬
        setCheckedButtons(checkedButtons.filter((el) => el !== code));
    if (isChecked) {
      setIsChecked(false);
    }
    if (checked) {
      if (!isChecked) {
        businesses.length === checkedButtons.length + 1
          ? setIsChecked((prev) => !prev)
          : null;
      }
    }
  };

  /** 모두 선택해주는 체크박스 */
  const allCheckBox = (e) => {
    if (!isChecked) {
      // e.currentTarget.checked
      setIsChecked(e.target.checked);
      // checkedButtons에 business의 모든 code 값 넣기
      const data = businesses.map((el) => el.code);
      console.log(data);
      setCheckedButtons(data);
    } else {
      setIsChecked(e.target.checked);
      setCheckedButtons([]);
    }
  };

  /** 삭제 api */
  const deleteItemHandler = async (data) => {
    console.log(" ===== delete ===== ");
    console.log(data);
    await customFetch(`/api/business/delete`, {
      method: "post",
      body: JSON.stringify(data),
    }).then(() => {
      setIsChecked(false); // allCheckBox 체크 해제
      setCheckedButtons([]); // check된 행의 code를 담고 있던 state clear
      fetchBusinessList(); // 리스트 fetch
      setItem({ code: "", name: "", phone: "" }); // 업데이트 항목에 있는 item clear
    });
  };
  // ================================================================================

  useEffect(() => {
    fetchBusinessList();
  }, []);

  useEffect(() => {
    refForm.current.reset();
  }, [searchEvent]);

  useEffect(() => {
    if (codeChk) {
      refForm.current.reset();
      setPhone("");
    }
  }, [codeChk]);

  // =================================== ADD =======================================
  /** 데이터를 리스트에 추가하는 Handler */
  const addItemHandler = async function (data) {
    await customFetch("/api/business/add", {
      method: "post",
      body: JSON.stringify(data),
    }).then((json) => {
      console.log(json.data);
      if (json.data.state === "true") {
        setBusinesses((prev) => [...prev, json.data.vo]);
        setCodeChk(true);
      } else {
        setCodeChk(false);
      }
    });
  };

  /** form 데이터 변환 */
  function handleSubmit(e) {
    e.preventDefault();

    const data = Array.from(refForm.current.elements, (input) => {
      return { n: input.name, v: input.value };
    })
      .filter(({ n }) => n !== "")
      .reduce((res, { n, v }) => {
        // console.log(`res: ${res}, n: ${n}, v: ${v}`);
        if (v === "") {
          if (isCheck.current) {
            isCheck.current = false;
            document.getElementById(n).focus();
          }
        }
        res[n] = v;
        return res;
      }, {});

    setData(data);
    if (isCheck.current) {
      addItemHandler(data);
      if (!codeChk) {
        document.getElementById("code").focus();
      }
    }
    isCheck.current = true;
  }

  /** 마지막행에서 Enter 누르면 */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  // ================================================================================
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
    setItem({ code: "", name: "", phone: "" });
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
            display: "flex",
          }}
        >
          <DeleteIcon
            sx={{ padding: "7px", cursor: "pointer", marginLeft: "auto" }}
            onClick={() =>
              checkedButtons.length === 0
                ? console.log("비어있음")
                : deleteItemHandler(checkedButtons)
            }
          />
        </Box>
        <FormControl component="form" onSubmit={handleSubmit} ref={refForm}>
          <TableContainer
            component={Paper}
            sx={{
              width: "94%",
              padding: 3,
              paddingTop: 0,
              boxShadow: "none",
              height: 550,
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    <Checkbox
                      size="small"
                      onChange={(e) => {
                        allCheckBox(e);
                      }}
                      checked={isChecked}
                    />
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    순번
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    거래처 아이디
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    거래처명
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    연락처
                  </TableCell>
                </TableRow>

                <TableRow sx={{ height: 2, p: 0 }}>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="code"
                      name="code"
                      type="text"
                      placeholder="코드"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={
                        (data && data.code === "") ||
                        (!codeChk && codeChk != null)
                          ? true
                          : false
                      }
                      InputProps={{ sx: { height: 30 } }}
                    ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="name"
                      name="name"
                      type="text"
                      placeholder="이름"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={data && data.name === "" ? true : false}
                      InputProps={{ sx: { height: 30 } }}
                    ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="전화번호"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={data && data.phone === "" ? true : false}
                      InputProps={{ sx: { height: 30 } }}
                      value={phone}
                      onChange={handlePhoneChange}
                    ></TextField>
                  </TableStickyTypeCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {businesses.length > 0 ? (
                  businesses.map((item, index) => (
                    <BusinessItem
                      key={`business_item_${item.code}`}
                      no={index}
                      code={item.code}
                      name={item.name}
                      phone={item.phone}
                      businessDetail={businessDetail}
                      checkedButtons={checkedButtons}
                      changeHandler={changeHandler}
                      handleCheckboxClick={handleCheckboxClick}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                      등록된 거래처가 없습니다.
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
}

export default List;
