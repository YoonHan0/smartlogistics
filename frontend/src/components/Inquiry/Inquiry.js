import React, { useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid } from '@mui/material';
import List from './List';
import Graph from './Graph';
import { customFetch } from '../custom/customFetch';
import { format } from 'date-fns';
import dayjs from 'dayjs';

const Inquiry = () => {
  const [state, setState] = useState(true);
  const [list, setList] = useState([]);
  const [seDate, setSeDate] = useState({ sDate: '', eDate: '' });
  const [searchKw, setSearchKw] = useState({ user_name: '', business_name: '', code: '', startdt: '', enddt: '' });
  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);
  const scrollend = useRef(false);
  const loading = useRef(true);
  useEffect(() => {
    searchKeyword(null, 'load');
  }, []);

  const searchKeyword = async (searchKw, _state) => {
    if (_state === 'search') {
      startIndex.current = 0;
      setList([]);
      loading.current = true;
      scrollend.current = false;
      setIsFetching(false);
    }

    if (isFetching) {
      return;
    }

    let startdt = '';
    let enddt = '';

    if (searchKw && searchKw.startdt === '' && searchKw.enddt !== '') {
      startdt = format(dayjs().subtract(6, 'day').$d, 'yyyy-MM-dd');
      enddt = format(searchKw.enddt.$d, 'yyyy-MM-dd');
    } else if (searchKw && searchKw.enddt === '' && searchKw.startdt !== '') {
      startdt = format(searchKw.startdt.$d, 'yyyy-MM-dd');
      enddt = format(dayjs().add(6, 'day').$d, 'yyyy-MM-dd');
    } else if (searchKw && searchKw.startdt !== '' && searchKw.enddt !== '') {
      startdt = format(searchKw.startdt.$d, 'yyyy-MM-dd');
      enddt = format(searchKw.enddt.$d, 'yyyy-MM-dd');
    } else if ((searchKw != null && searchKw.startdt === '' && searchKw.enddt === '') || searchKw === null) {
      startdt = format(dayjs().subtract(6, 'day').$d, 'yyyy-MM-dd');
      enddt = format(dayjs().add(6, 'day').$d, 'yyyy-MM-dd');
    }

    setIsFetching(true);
    const limit = 20;
    console.log('startIndex', startIndex.current);
    console.log('limit', limit);

    var url = `/api/inquiry/list?offset=${startIndex.current}&limit=${limit}`;
    if (searchKw) {
      url = `/api/inquiry/list?offset=${startIndex.current}&limit=${limit}&sdt=${startdt}&edt=${enddt}&user_name=${searchKw.user_name}&business_name=${searchKw.business_name}&code=${searchKw.code}`;
    }

    console.log(url);

    if (scrollend.current === true) {
      return;
    }

    await customFetch(url, {
      method: "get",
    }).then((json) => {
      const { dataList, sDate, eDate } = json.data;
      console.log('dataList', dataList);
      setList(pre => [...pre, ...dataList]);
      setSeDate({ sDate: sDate, eDate: eDate });

      if (json.data !== null) {
        loading.current = false;
      }

      if (json.data.length === 0) {
        scrollend.current = true;
      }

      if (state === 'search') {
        rowColor.current = '';
        setList([]);
      }
    }).finally(() => {
      startIndex.current += 20;
      setIsFetching(false);
      console.log('list', list);
    });
  }

  return (
    <Box>
      <Grid container sx={{ marginLeft: "0px" }}>
        <SearchBar
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
              loading={loading}
            />
            :
            <Graph />
        }
      </Grid>
    </Box>
  );
};

export default Inquiry;