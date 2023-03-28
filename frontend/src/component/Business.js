import React, { useEffect, useState } from 'react'
import Search from './Search';
import BusinessList from './BusinessList';


const Business = () => {
  console.log("시시작작");

  /** fetch, 즉 list를 출력하기 위한 state */
  const [businesses, setBusinesses] = useState([{}]);
  /** 검색을 위한 state */
  const [datas, setDatas] = useState({id: "", name: "", phone: "", inputDate: "", userNo: ""});
  
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
    console.log("useEffect!");
    fetchBusinessList();
  }, []);

  const inputClear = () => {
    setDatas({id: "", name: "", phone: "", inputDate: "", userNo: ""});
  }
  const textHandleChanges = (e) => {
    setDatas({[e.target.name]: e.target.value});
    // xconsole.log(datas);

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

  return (
    <div className='businessClass'>
        <Search textHandleChanges={textHandleChanges} clearCallback={inputClear}/>
        <BusinessList businesses={businesses}/>
    </div>
  )
}

export default Business