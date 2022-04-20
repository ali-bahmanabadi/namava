import React from 'react'
import config from '../../config'
import { getNamavaUrl } from '../../utils/functions'

import './PersonItem.scss'

const getRoleName = (role) => {
  switch (role) {
    case "Actor":
      return "بازیگر"
    case "Author":
      return "نویسنده"
    case "Director":
      return "کارگزدان"
    default:
      return role
  }
}

const PersonItem = ({ item, placeholder = false }) => {

  let imageUrl = item.imageUrl || item.castImageUrl

  if (imageUrl) {
    imageUrl = getNamavaUrl(imageUrl)
  } else {
    imageUrl = config.defaultImage
  }

  return (
    <div className="person-item">
      <a href="/">
        <div className="person-image">
          {placeholder === false && (
            <img src={imageUrl} alt={item.castName} />
          )}
        </div>
        <div className='person-title'>
          {item.castName}
        </div>
        <div className='person-role'>
          {getRoleName(item.castRole)}
        </div>
      </a>
    </div>
  )
}

export default PersonItem
