import { getNamavaUrl } from "../../utils/functions"
import './TrailerItem.scss'

const TrailerItem = ({item, placeholder = false}) => {
  return (
    <div className="trailer-item">
      <div className="trailer-image">
        {placeholder === false && (
          <img src={getNamavaUrl(item.imageUrl)} alt='' />
        )}
      </div>
      
       
    </div>
  )
}

export default TrailerItem
