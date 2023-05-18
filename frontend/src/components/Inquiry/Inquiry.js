import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid } from '@mui/material';
import List from './List';
import Graph from './Graph';
import { customFetch } from '../custom/customFetch';
const Inquiry = () => {
  const [state, setState] = useState(true);
  const [list, setList] = useState([]);
  const [seDate, setSeDate] = useState({ sDate: '', eDate: '' });
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchChk, setSearchChk] = useState();

  const currentDate = (value) => {
    const current = new Date();

    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()+value).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const [searchKw, setSearchKw] = useState({ user_name: '', business_name: '',code: '', startdt: '', enddt: '' });

  const searchKeyword = async (searchKw, startIndex,limit) => {
    limit === null ? 10 : limit;
    setLoading(true);
    console.log(startIndex)
    var url = `/api/inquiry/list?offset=${startIndex}&limit=${limit}`;
    if (searchKw) {
      url = `/api/inquiry/list?offset=${startIndex}&limit=${limit}&sdt=${searchKw.startdt}&edt=${searchKw.enddt}&user_name=${searchKw.user_name}&business_name=${searchKw.business_name}&code=${searchKw.code}`;
    }
    console.log(url)
    await customFetch(url, {
      method: "get",
    }).then((json) => {
      console.log(json.data);
      const { dataList, sDate, eDate } = json.data;
      setList(dataList);
      setSeDate({ sDate: sDate, eDate: eDate });
      setHasNextPage(json.data.length === 10);
    }).finally(()=>{
      setLoading(false);
    });
  }


  useEffect(() => {
    searchKeyword(searchKw, 0,0);
  },[])
  return (
    <Box>
      <Grid container sx={{ marginLeft: "0px" }}>
        <Grid item xs={12}>
          <SearchBar
            item
            xs={12}
            seDate={seDate}
            state={state}
            setState={setState}
            searchKeyword={searchKeyword}
            searchKw={searchKw}
            setSearchKw={setSearchKw}
             />
          {
            state
              ?
              <List
                list={list}
                searchKw={searchKw}
                searchKeyword={searchKeyword} 
                setSearchKw={setSearchKw}
                setSearchChk={setSearchChk}
                searchChk={searchChk}
                hasNextPage={hasNextPage}
                setHasNextPage={setHasNextPage}
                loading={loading}
                />
              :
              <Graph/>
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default Inquiry;