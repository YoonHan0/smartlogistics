import React from 'react';
import styles from '../assets/scss/component/List.scss';
import BusinessItem from './BusinessItem';
/** 조건에 맞는 리스트 주르륵 출력 */
function List({businesses}) {
  return (
        <table className={styles.list}>
          <thead>
            <tr>
              <th>순번</th>
              <th>거래처 아이디</th>
              <th>관리자명</th>
              <th>연락처</th>
            </tr>
          </thead>
          <tbody>
            {
              businesses.map((item, index) => <BusinessItem key={`business_item_${item.id}`}
                                                   no={index}
                                                   id={item.id}
                                                   name={item.name}
                                                   phone={item.phone}/>)

            }
          </tbody>
            
        </table>
  )
}

export default List