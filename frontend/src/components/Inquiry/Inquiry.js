import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid } from '@mui/material';
import List from './List';
import Graph from './Graph';
import { customFetch } from '../custom/customFetch';
const Inquiry = () => {
  const [state, setState] = useState(true);
  const [list, setList] = useState([]);
  const currentDate = (value) => {
    const current = new Date();

    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()+value).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const [sdate, setSdate] = useState();
  const [edate, setEdate] = useState();
  const [searchKw, setSearchKw] = useState({});

  const searchKeyword = async (keyword) => {
    console.log(keyword)
    await customFetch(`/api/inquiry/search?sdate=${keyword.sdate}&edate=${keyword.edate}&code=${keyword.code}&user_name=${keyword.user_name}&business_name=${keyword.business_name}`, {
      method: "post",
    }).then((json) => setList(json.data));
  }

  useEffect(() =>{
    setSearchKw({ sdate: currentDate(-7), edate: currentDate(7), code: '', user_name: '', business_name: '' });
    setSdate(currentDate(-7));
    setEdate(currentDate(7));
  },[]);

  useEffect(() =>{
    searchKeyword(searchKw);
  },[searchKw])

  return (
    <Box>
      <Grid container sx={{ marginLeft: "0px" }}>
        <Grid item xs={12}>
          <SearchBar
            item
            xs={12}
            state={state}
            setState={setState}
            searchKeyword={searchKeyword}
            sdate={sdate}
            setSdate={setSdate}
            edate={edate}
            setEdate={setEdate}
            searchKw={searchKw}
            setSearchKw={setSearchKw}
             />
          {
            state
              ?
              <List
                list={list}
                searchKw={searchKw}
                searchKeyword={searchKeyword} />
              :
              <Graph/>
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default Inquiry;