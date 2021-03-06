import React from 'react'
import { useLocation } from 'react-router-dom'
import MultiLineList from '../../components/List/MultiLineList'
import { getItemComponent } from '../../utils/functions'

const List = ({
  data: { payloadType, payloadKey, items, title, option },
  showMore,
}) => {
  const location = useLocation()
  const itemComponent = getItemComponent(payloadType)
  console.log(location)
  return (
    <div className="list container-fluid">
      <div className="row p-0">
        <MultiLineList
          data={{
            payloadType,
            payloadKey,
            items,
            title,
            option,
            showMore,
            pi: items !== undefined ? 1 : 0
          }}
          preview={true}
          ItemComponent={itemComponent}
        />
      </div>
    </div>
  )
}

export default List
