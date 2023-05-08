import React, { useEffect, useRef, useState } from "react";
import ProductItem from "./ProductItem";
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
  Grid,
  NativeSelect,
  Paper,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 50.5px;
  }
`;

const ProductList = ({
  products,
  productDetail,
  deleteItemHandler,
  itemAddHandler,
  setItem,
}) => {
  /** fetch, 즉 list를 출력하기 위한 state */
  const refForm = useRef(null);
  /** Delete를 위한 체크박스 State */
  const [checkedButtons, setCheckedButtons] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  /** form 데이터 */
  const [data, setData] = useState({});
  /**  submit하기위한 check여부 */
  const isCheck = useRef(true);
  useEffect(() => {}, [data]);
  /** form데이터를 베열에 넣어 add*/
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Array.from(refForm.current.elements, (input) => {
      return { n: input.name, v: input.value };
    })
      .filter(({ n }) => n !== "")
      .reduce((res, { n, v }) => {
        //console.log(`res: ${res}, n: ${n}, v: ${v}`);
        if (v === "") {
          if (isCheck.current) {
            isCheck.current = false;
            document.getElementById(n).focus();
          }
        }
        res[n] = v;
        return res;
      }, {});
    setData(formData);
    if (isCheck.current) {
      itemAddHandler(formData);
      refForm.current.reset();
    }
    isCheck.current = true;
  };
  /** 마지막행에서 Enter 누르면 */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  /**scroll 미완 */
  // const [scrollTop, setScrollTop] = useState(0);

  // const handleScroll = (event) => {
  //   setScrollTop(event.currentTarget.scrollTop);
  //   console.log(event.currentTarget.scrollTop);
  // };

  /** Delete를 체크박스 Handler  */
  const changeHandler = (checked, code) => {
    //console.log(`checked: ${checked}, code: ${code}`);
    if (checked) {
      setCheckedButtons([...checkedButtons, code]);
      // console.log("체크 반영 완료");
      // console.log(checkedButtons);
      // console.log(checkedButtons.length);
    } else {
      // 클릭된 'code'랑 같으면 제거해서 새로운 배열을 만듬
      setCheckedButtons(checkedButtons.filter((el) => el !== code));
      // console.log("체크 해제 반영 완료");
    }
  };
  /** 모두 선택해주는 체크박스 */
  const allCheckBox = (e) => {
    if (!isChecked) {
      // e.currentTarget.checked
      setIsChecked(e.target.checked);
      // checkedButtons에 business의 모든 code 값 넣기
      const data = products.map((el) => el.code);
      console.log(data);
      setCheckedButtons(data);
    } else {
      setIsChecked(e.target.checked);
      setCheckedButtons([]);
    }
  };
  return (
    <Grid item xs={8}
      sx={{
        width: '100%',
        height: '730px',
        marginRight: 4,
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
      }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}>
        <Box sx={{width: '97%', display: 'flex'}}>
          <DeleteIcon
            sx={{padding: "7px",cursor: "pointer", marginLeft:'auto'}}
            onClick={() => {
              deleteItemHandler(checkedButtons);
              setCheckedButtons([]);
              setIsChecked(false);
              setItem({ code: "", name: "", phone: "" });
            }}
          />
        </Box>
        <FormControl component="form" onSubmit={handleSubmit} ref={refForm}>
          <TableContainer
            component={Paper}
            sx={{
              width: "94%",
              paddingLeft: 3,
              paddingTop: 0,
              boxShadow: "none",
              height: 550,
              // marginLeft: "40px",
            }}
            // onScroll={handleScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{height: 3}}>
                  <TableCell sx={{ width: "10%", backgroundColor: '#F6F7F9' }}>
                    <Checkbox
                      size="small"
                      onChange={(e) => {
                        allCheckBox(e);
                      }}
                      checked={isChecked}
                    />
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: '#F6F7F9'}}>순번</TableCell>
                  <TableCell sx={{backgroundColor: '#F6F7F9'}}>품번</TableCell>
                  <TableCell sx={{backgroundColor: '#F6F7F9'}}>품명</TableCell>
                  <TableCell sx={{backgroundColor: '#F6F7F9'}}>규격</TableCell>
                  <TableCell sx={{ width: "15%", backgroundColor: '#F6F7F9'}}>단위</TableCell>
                </TableRow>
                <TableRow sx={{ height: 2, p: 0 }}>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="code"
                      name="code"
                      type="text"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={data && data.code === "" ? true : false}
                      InputProps={{ sx: { height: 30 } }}
                    ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="name"
                      name="name"
                      type="text"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={data && data.name === "" ? true : false}
                      InputProps={{ sx: { height: 30 } }}
                    ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="size"
                      name="size"
                      type="text"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={data && data.size === "" ? true : false}
                      InputProps={{ sx: { height: 30 } }}
                    ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: "unit",
                        id: "uncontrolled-native",
                      }}
                      onKeyPress={handleKeyDown}
                    >
                      <option value={"EA"}>EA</option>
                      <option value={"PK"}>PK</option>
                    </NativeSelect>
                  </TableStickyTypeCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <ProductItem
                      key={index}
                      no={index}
                      code={product.code}
                      name={product.name}
                      size={product.size}
                      unit={product.unit}
                      productDetail={productDetail}
                      checkedButtons={checkedButtons}
                      changeHandler={changeHandler}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: "center" }}>
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

export default ProductList;