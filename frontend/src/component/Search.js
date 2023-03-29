import React, { useRef, useState } from 'react'

function Search({textHandleChanges}) {
  const refForm = useRef(null);
  return (
    <div>
      <form name='searchForm' 
            ref={refForm}
            onSubmit={e => {
              
              e.preventDefault();
              // console.log(e.target.elements.value);
              textHandleChanges(e);  // clear 하기

              // e.target.elements.id.value = null;
              // e.target.elements.name.value = null;
              // e.target.elements.phone.value = null;
              refForm.current.reset();

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