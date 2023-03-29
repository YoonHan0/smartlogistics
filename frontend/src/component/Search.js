import React, { useState } from 'react'

function Search({textHandleChanges}) {
  
  return (
    <div>
      <form name='searchForm' 
            onSubmit={e => {
              
              e.preventDefault();
              // console.log(e.target.elements.value);
              textHandleChanges(e);  // clear 하기
              e.target.elements.id.value = null;
              e.target.elements.name.value = null;
              e.target.elements.phone.value = null;

              // setDatas({id: "", name: "", phone: ""}); 
            }}>
        <input type='text' name='id' placeholder='거래처 ID' />
        <input type='text' name='name' placeholder='거래처 NAME' />
        <input type='text' name='phone' placeholder='거래처 PHONE' />
        <input type='submit' name='submit' value='검색' />
      </form>
        
    </div>
  )
}

export default Search