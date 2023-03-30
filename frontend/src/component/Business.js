import React, { useEffect, useRef, useState } from 'react'
import Search from './Search';
import BusinessList from './BusinessList';
import AddItem from './AddItem';


const Business = () => {
  /** fetch, 즉 list를 출력하기 위한 state */
  const [businesses, setBusinesses] = useState([{}]);  
  /** 검색을 위한 state */
  const [datas, setDatas] = useState({id: "", name: "", phone: "", inputDate: "", userNo: ""});
  // const fileInputRef = useRef(null);
  
  /** 처음 실행될 때 Business List를 불러오기 위한 fetch 함수 */
  const fetchBusinessList = async () => {
    console.log("시작!");
    try {
      const response = await fetch('/api/business', {
          method: 'get',      // get방식
          headers: {
              'Accept': 'application/json'    // application/json방식으로 받을 수 있다
          }
      });
      if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      if(json.result !== 'success') {
          throw new Error(`${json.result} ${json.message}`)
      }
      setBusinesses(json.data);
    } catch(err) {
        console.log(err.message);
    }
  }
  useEffect(()=>{
    fetchBusinessList();
  }, []);

  /** 들어오는 값이 빈 값이면 모든 리스트 출력 / 아니면 검색어에 대한 결과값 출력 */
  const textHandleChanges = (e) => {
    // console.log(e.target.elements[0].name);
    const _target = e.target.elements;
    (_target[0].value == '' && _target[1].value == '' && _target[2].value == '') ? fetchBusinessList() : search(e.target)
    
  }
  const search = (_target) => {
    const datas = Array.from(_target, (input) => {
      return {n: input.name, v: input.value};
    })
    .filter(({n}) => n !== '')
    .reduce((res, {n, v}) => {
        console.log(`res: ${res}, name: ${n}, value: ${v}`);
        res[n] = v;
        return res;
    }, {});
    console.log(datas);
    searchFormHandler(datas);
  }

  /** 검색, 조회하는 Handler */
  const searchFormHandler = async function(datas) {
    // console.log(datas);
    try {
      const response = await fetch('/api/business/search', {
          method: 'post',      // get방식
          headers: {
            'Content-Type': 'application/json',    
            'Accept': 'application/json'    // application/json방식으로 받을 수 있다
          },
          body: JSON.stringify(datas)
      });
      if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      if(json.result !== 'success') {
          throw new Error(`${json.result} ${json.message}`)
      }
      
      setBusinesses(json.data);
    } catch(err) {
        console.log(err.message);
    }
  }
  useEffect(() => {
    searchFormHandler(datas);
    console.log(datas);
    return () => {};
  }, [datas]);

  const addList = async function(e) {
    e.preventDefault();
    console.log(e.target);

    try {
      /* input이라는 Parmeter로 e.target애 하나씩 접근 */
      const addData = Array.from(e.target, (input) => {
              // simple validatation of empty string
              // if (input.value === '') {
              //     throw `validation ${input.placeholder} is empty ''`;
              // }
              return {n: input.name, v: input.value};
          })
          .filter(({n}) => n !== '')
          .reduce((res, {n, v}) => {
              console.log(`res: ${res}, n: ${n}, v: ${v}`);
              res[n] = v;
              return res;
          }, {});

          console.log(`들어가는 데이터 확인: ${addData}`);
          addItemHandler(addData);  // add api 날리기
      } catch (err) {
          console.error(err);
      }
  }

  /** 데이터를 리스트에 추가하는 Handler */
  const addItemHandler = async function(data) {
    try {
      const response = await fetch('/api/business/add', {
          method: 'post',      // get방식
          headers: {
            'Content-Type': 'application/json',    
            'Accept': 'application/json'    // application/json방식으로 받을 수 있다
          },
          body: JSON.stringify(data)
      });
      if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      if(json.result !== 'success') {
          throw new Error(`${json.result} ${json.message}`)
      }
      
      setBusinesses([...businesses, json.data]);
    } catch(err) {
        console.log(err.message);
    }
  }

  return (
    <div className='businessClass'>
        <Search textHandleChanges={textHandleChanges} />
        <AddItem addList={addList} />
        <BusinessList businesses={businesses}/>
    </div>
  )
}

export default Business