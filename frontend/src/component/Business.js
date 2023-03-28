import React, { useEffect, useState } from 'react'
import Search from './Search';
import BusinessList from './BusinessList';


function Business() {
  console.log("시시작작");
  const [businesses, setBusinesses] = useState([{}]);

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
  return (
    <div className='businessClass'>
        <Search />
        <BusinessList businesses={businesses}/>
    </div>
  )
}

export default Business