import React from 'react';
import styles from '../assets/scss/component/List.scss';
import BusinessItem from './BusinessItem';
/** 조건에 맞는 리스트 주르륵 출력 */
function List({businesses}) {
  return (
        <ul className={styles.list}>
            {
              businesses.map(item => <BusinessItem key={`business_item_${item.id}`}
                                                   id={item.id}
                                                   name={item.name}
                                                   phone={item.phone}/>)
            }
        </ul>
  )
}

export default List