import {
  Box,
  Grid,
  NativeSelect,
} from "@mui/material";
import React, { useEffect, useRef } from 'react';
import checkImg from "../../assets/img/checkmark.png";
import StockTable from "./StockTable";

const List = ({
  list,
  setList,
  searchKw,
  setSearchKw,
  loading,
  searchKeyword,
}) => {
  const selectSt = useRef('ALL');
  const handleSelect = (e) => {
    console.log(e.target.value);
    selectSt.current = e.target.value;
    setSearchKw({...searchKw, st: selectSt.current});
  }

  useEffect(()=> {
    setList([]);
    searchKeyword(searchKw, 'search');
  },[selectSt.current])
  return (
    <Grid
      item
      xs={12}
      sx={{
        width: "100%",
        height: 720,
        paddingTop: 2,
        backgroundColor: "#FFF",
        borderRadius: "8px",
        marginBottom: 1.8,
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: 'flex', paddingLeft: 5, width: "94%" }}>

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
          현황리스트
        </span>
      </Box>
      <Box
        sx={{
          flexDirection: "column",
          width: "100%",
        }}
      >
        <NativeSelect
          sx={{
            float: 'right',
            width: 60,
            marginBottom: 0.5
          }}
          defaultValue={30}
          inputProps={{
            name: 'unit',
            id: 'uncontrolled-native',
          }}
          onChange={handleSelect}
        >
          <option value={'ALL'}>ALL</option>
          <option value={'RV'}>입고</option>
          <option value={'IS'}>출고</option>
        </NativeSelect>
        <StockTable list={list} searchKw={searchKw} searchKeyword={searchKeyword} loading={loading} />
      </Box>
    </Grid>
  );
};

export default List;