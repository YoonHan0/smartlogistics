import React from 'react'

function Search() {
  return (
    <div>
        <input type='text' placeholder='거래처 ID'/>
        <input type='text' placeholder='거래처 NAME'/>
        <input type='text' placeholder='거래처 PHONE'/>
        <input type='button' value='검색' />
    </div>
  )
}

export default Search