import React from 'react'

function Search() {

  const searchFormHandler = async function(id, name, phone) {
    // console.log(id, name, phone);
    
  }

  return (
    <div>
      <form 
        name='searchForm' 
        onSubmit={e => {
          e.preventDefault();
          searchFormHandler(
            e.target.elements.id.value,
            e.target.elements.name.value,
            e.target.elements.phone.value
          );
      }}>
        <input type='text' name='id' placeholder='거래처 ID'/>
        <input type='text' name='name' placeholder='거래처 NAME'/>
        <input type='text' name='phone' placeholder='거래처 PHONE'/>
        <input type='submit' value='검색' />
      </form>
        
    </div>
  )
}

export default Search