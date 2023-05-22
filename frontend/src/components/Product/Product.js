import React, { useState, useEffect, useRef } from 'react';
import ProductList from './ProductList';
import SearchBar from './SearchBar';
import ProductUpdate from './ProductUpdate';
import { Box, Grid } from '@mui/material';
import { customFetch } from '../custom/customFetch';

const Product = () => {
  // productlist
  const [products, setProducts] = useState([]);
  // productdetail
  const [Detail, setDetail] = useState([]);
  const [searchEvent, setSearchEvent] = useState(false);
  const [item, setItem] = useState({ code: '', name: '', size: '', unit: '' });
  const rowColor = useRef();
  const [codeChk, setCodeChk] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    productSearch(null);
  }, []);

  // product 검색
  const productSearch = async (searchKw) => {
    var url = `/api/product/list`;
    if (searchKw) {
      url = `/api/product/list?pk=${searchKw.pkeywd}&ps=${searchKw.psize}`;
    }

    await customFetch(url, { method: 'get' }).then((json) => {
      setProducts(json.data);
      setLoading(false);
    });
    setSearchEvent((prev) => !prev);
    setDetail([]);
  };

  // product 추가
  const itemAddHandler = async (item) => {
    //console.log(item);
    if (item != null) {
      await customFetch('/api/product/data', {
        method: 'post',
        body: JSON.stringify(item),
      }).then((json) => {
        console.log(json.data);
        if (json.data.state === 'true') {
          setProducts((prev) => [...prev, json.data.vo]);
          setCodeChk(true);
          alert('등록되었습니다.');
        } else {
          setCodeChk(false);
          console.log(json.data.vo.state);
          if (json.data.vo.state === '1') {
            alert('이미 등록되어 있는 데이터 입니다');
          } else if (json.data.vo.state === '0') {
            alert('삭제된 데이터 품번과 동일합니다.');
          }
          //if(json.data.vo.state)
        }
      });
    }
  };

  //product 수정
  const itemUpdateHandler = async (item, target) => {
    console.log('update');
    await customFetch(`/api/product/update?pc=${target}`, {
      method: 'post',
      body: JSON.stringify(item),
    }).then(() => productSearch(null));
    setSearchEvent((prev) => !prev);
  };

  // product 세부사항
  const productDetail = async (code) => {
    await customFetch(`/api/product/detail?pc=${code}`, { method: 'get' }).then((json) => {
      setDetail(json.data);
      rowColor.current = code;
      setCodeChk(true);
    });
    setSearchEvent((prev) => !prev);
  };

  // product 삭제
  const deleteItemHandler = async (data) => {
    await customFetch(`/api/product/delete`, {
      method: 'post',
      body: JSON.stringify(data),
    }).then((json) => {
      json.data === null
        ? alert('사용되고 있는 데이터입니다. 입﹒출고를 완료한 후 삭제를 해주세요.')
        : setProducts(products.filter((product) => json.data.indexOf(product.code) == -1));
    });
    setSearchEvent((prev) => !prev);
  };

  return (
    <Box>
      <Grid container spacing={2} style={{ marginLeft: '0px' }}>
        <SearchBar callback={productSearch} />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
          }}
        >
          <ProductList
            products={products}
            productDetail={productDetail}
            itemAddHandler={itemAddHandler}
            deleteItemHandler={deleteItemHandler}
            setItem={setItem}
            rowColor={rowColor}
            codeChk={codeChk}
            searchEvent={searchEvent}
            loading={loading}
          />
          <ProductUpdate productDetail={Detail} itemUpdateHandler={itemUpdateHandler} item={item} setItem={setItem} />
        </Box>
      </Grid>
    </Box>
  );
};

export default Product;
