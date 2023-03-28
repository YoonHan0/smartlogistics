import React from 'react'

function BusinessItem(
    {   
        no,
        id,
        name,
        phone}) {

  return (
        <tr>
            <th>{no+1}</th>
            <th>{id}</th>
            <th>{name}</th>
            <th>{phone}</th>
        </tr>
  )
}

export default BusinessItem