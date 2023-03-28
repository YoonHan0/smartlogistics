import React, { useState } from 'react'

function Search({textHandleChanges}) {

  return (
    <div>
      <form name='searchForm' 
            onSubmit={e => {
              e.preventDefault();
              // console.log(e.target.elements.value);
              e.target.elements.id.value = null;
              e.target.elements.name.value = null;
              e.target.elements.phone.value = null;

              // setDatas({id: "", name: "", phone: ""}); 
            }}>
        <input type='text' name='id' placeholder='거래처 ID' 
               onChange={e => {textHandleChanges(e)}}/>
        <input type='text' name='name' placeholder='거래처 NAME' 
               onChange={e => {textHandleChanges(e)}}/>
        <input type='text' name='phone' placeholder='거래처 PHONE' 
               onChange={e => {textHandleChanges(e)}}/>
        <input type='submit' value='초기화' />
      </form>
        
    </div>
  )
}

export default Search