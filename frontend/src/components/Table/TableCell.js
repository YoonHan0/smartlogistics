import React from 'react';

const TableCell = ({ style, children }) => {
  const updatedStyle = Object.assign({}, style, { 
    padding:'10px',
    align: 'center',
    verticalAlign: 'middle',
    width: '150px'
  });
  return (
    <td 
      style={updatedStyle}
      colspan="10">
      {children}
    </td>
  );
};

export default TableCell;