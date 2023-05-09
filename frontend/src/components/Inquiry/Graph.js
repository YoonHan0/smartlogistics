import { Box, Button, Grid } from '@mui/material';
import checkImg from "../../assets/img/checkmark.png";
import React, { useState } from 'react';
import DayGraph from './DayGraph';
import MonthGraph from './MonthGraph';
import YearGraph from './YearGraph';

const Graph = ({graph, setGraph, showGraph,data,setData }) => {
  const handleClickDay =(e) => {
    setGraph((graph) => 'day');
    showGraph();
  }

  const handleClickMonth =(e) => {
    setGraph((graph) => 'month');
    showGraph();
  }

  const handleClickYear =(e) => {
    setGraph((graph) => 'year');
    showGraph();
  }

  return (
    <Grid
      item
      xs={12}
      sx={{
        width: "100%",
        height: 720,
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
        <Box>
          <Button onClick={handleClickDay}>일</Button>
          <Button onClick={handleClickMonth}>월</Button>
          <Button onClick={handleClickYear}>년</Button>
        </Box>
        {
          graph === 'day' ?
            <DayGraph data={data} setData={setData}/>
            :
            graph === 'month' ?
              <MonthGraph data={data} setData={setData} />
              :
              <YearGraph data={data} setData={setData} />
        }
    </Box>
    </Grid >
  );
};

export default Graph;