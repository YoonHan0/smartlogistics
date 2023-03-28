import React from 'react'

function BusinessItem(
    {
        id,
        name,
        phone}) {

  return (
    <div>
        {id}, {name}, {phone}
    </div>
  )
}

export default BusinessItem