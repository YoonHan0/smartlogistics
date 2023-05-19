import React, { useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid } from '@mui/material';
import List from './List';
import Graph from './Graph';
import { customFetch } from '../custom/customFetch';
const Inquiry = () => {
  const [state, setState] = useState(true);
  const [list, setList] = useState([]);
  const [seDate, setSeDate] = useState({ sDate: '', eDate: '' });
  const [loading, setLoading] = useState(false);
  const [searchChk, setSearchChk] = useState();
  const [searchKw, setSearchKw] = useState({ user_name: '', business_name: '', code: '', startdt: '', enddt: '' });
  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);


  const searchKeyword = async () => {
    if (isFetching) {
      return;
    }
    setIsFetching(true);
    const limit = 10;
    setLoading(true);
    console.log('startIndex', startIndex.current)
    console.log('limit', limit)
    var url = `/api/inquiry/list?offset=${startIndex.current}&limit=${limit}`;
    if (searchKw) {
      url = `/api/inquiry/list?offset=${startIndex.current}&limit=${limit}&sdt=${searchKw.startdt}&edt=${searchKw.enddt}&user_name=${searchKw.user_name}&business_name=${searchKw.business_name}&code=${searchKw.code}`;
    }
    console.log(url)
    await customFetch(url, {
      method: "get",
    }).then((json) => {
      const { dataList, sDate, eDate } = json.data;
      console.log('dataList', dataList)
      setList(pre =>[...pre, ...dataList]);
      setSeDate({ sDate: sDate, eDate: eDate });
    }).finally(() => {
      startIndex.current += 10;
      setIsFetching(false);
      console.log('list',list)
    });
  }


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
                setList={setList}
                searchKw={searchKw}
                searchKeyword={searchKeyword}
                setSearchKw={setSearchKw}
                setSearchChk={setSearchChk}
                searchChk={searchChk}
                loading={loading}
              />
              :
              <Graph />
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default Inquiry;