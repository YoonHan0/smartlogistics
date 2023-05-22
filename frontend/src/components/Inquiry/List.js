import {
  Box,
  Grid,
} from "@mui/material";
import React from 'react';
import checkImg from "../../assets/img/checkmark.png";
import StockTable from "./StockTable";

const List = ({
  list,
  searchKw,
  loading,
  searchKeyword,
}) => {
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
      <Box sx={{ paddingLeft: 3, width: "94%" }}>
        <Box sx={{ display: 'flex' }}>
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
            display: "flex",
            marginTop: 1,
            flexDirection: "column",
            width: "100%",
          }}
        >
          <StockTable list={list} searchKw={searchKw} searchKeyword={searchKeyword} loading={loading}/>
        </Box>
      </Box>
    </Grid>
  );
};

export default List;