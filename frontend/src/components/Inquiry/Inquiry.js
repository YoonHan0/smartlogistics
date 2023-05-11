import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid } from '@mui/material';
import List from './List';
import Graph from './Graph';
const inquiry = () => {
  const [state, setState] = useState(true);
  const [list, setList] = useState([]);


  const findList = async () => {
    try {
      const response = await fetch("/api/inquiry/list", {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          Authorization: localStorage.getItem('token'),
        }
      });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }
      setList(json.data);
      console.log(json.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  const searchKeyword = async (keyword) => {
    console.log(keyword);
    try {
      const response = await fetch("/api/inquiry/search", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(keyword)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }
    } catch (err) {
      console.log(err.message);
    }
  }



  return (
    <Box>
      <Grid container sx={{ marginLeft: "0px" }}>
        <Grid item xs={12}>
          <SearchBar
            item
            xs={12}
            callback={searchKeyword}
            state={state}
            setState={setState} />
          {
            state
              ?
              <List
                list={list}
                findList={findList} />
              :
              <Graph/>
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default inquiry;