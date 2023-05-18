import React, { useEffect, useState } from 'react';
import Search from './Search';
import BusinessList from './BusinessList';
import BusinessUpdate from './BusinessUpdate';
import { Box, Grid } from '@mui/material';
import { customFetch } from '../custom/customFetch';

const Business = () => {
  /** fetch, 즉 list를 출력하기 위한 state */
  const [businesses, setBusinesses] = useState([{}]);
  /** 검색을 위한 state */
  const [datas, setDatas] = useState({
    code: '',
    name: '',
    phone: '',
    insertDate: '',
    userId: '',
  });
  const [Detail, setDetail] = useState([]);
  const [item, setItem] = useState({ code: '', name: '', phone: '' });
  const [searchEvent, setSearchEvent] = useState(false);
  const [loading, setLoading] = useState(true);

  // const fileInputRef = useRef(null);

  /** 처음 실행될 때 Business List를 불러오기 위한 fetch 함수 */
  const fetchBusinessList = async () => {
    console.log('===== fetch =====');
    await customFetch('/api/business', { method: 'get' }).then((json) => {
      setBusinesses(json.data);
      setLoading(false);
    });
  };
  // useEffect(()=>{
  //   fetchBusinessList();
  // }, []);

  /** 들어오는 값이 빈 값이면 모든 리스트 출력 / 아니면 검색어에 대한 결과값 출력 */
  const textHandleChanges = (e) => {
    // console.log(e.target.elements[0].name);
    const _target = e.target.elements;
    console.log(_target[2].value);
    _target[0].value === '' && _target[1].value === '' ? fetchBusinessList() : search(e.target);
  };
  const search = (_target) => {
    const datas = Array.from(_target, (input) => {
      return { n: input.name, v: input.value };
    })
      .filter(({ n }) => n !== '')
      .reduce((res, { n, v }) => {
        console.log(`res: ${res}, name: ${n}, value: ${v}`);
        res[n] = v;
        return res;
      }, {});
    console.log(datas);
    searchFormHandler(datas);
  };

  /** 검색, 조회하는 Handler */
  const searchFormHandler = async function (datas) {
    // console.log(datas);
    await customFetch('/api/business/search', {
      method: 'post',
      body: JSON.stringify(datas),
    }).then((json) => setBusinesses(json.data));
    setSearchEvent((prev) => !prev);
    setDetail([]);
  };

  // useEffect(() => {
  //   searchFormHandler(datas);
  //   console.log(datas);
  //   return () => {};
  // }, [datas]);

  /** Update Handler */
  const itemUpdateHandler = async (item, target) => {
    console.log('===== update =====');
    await customFetch(`/api/business/update?bc=${target}`, {
      method: 'post',
      body: JSON.stringify(item),
    }).then(fetchBusinessList);
    setSearchEvent((prev) => !prev);
  };

  const businessDetail = async (code) => {
    await customFetch(`/api/business/detail?bc=${code}`, {
      method: 'get',
    }).then((json) => setDetail(json.data));
    setSearchEvent((prev) => !prev);
  };

  return (
    <Box>
      <Grid container spacing={2} style={{ marginLeft: '0px' }}>
        <Search textHandleChanges={textHandleChanges} />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
          }}
        >
          <BusinessList
            businesses={businesses}
            setBusinesses={setBusinesses}
            fetchBusinessList={fetchBusinessList}
            businessDetail={businessDetail}
            setItem={setItem}
            searchEvent={searchEvent}
            loading={loading}
          />
          <BusinessUpdate businessDetail={Detail} itemUpdateHandler={itemUpdateHandler} item={item} setItem={setItem} />{' '}
          {/*addList={addList} */}
        </Box>
      </Grid>
    </Box>
  );
};

export default Business;
