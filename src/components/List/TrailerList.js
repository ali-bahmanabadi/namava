import TrailerItem from '../Trailer/TrailerItem'
import RowList from './RowList'
// import { SRLWrapper } from 'simple-react-lightbox'
import './TrailerList.scss'

const TrailerList = ({ id, images }) => {
  let items = []

  images.forEach((image, index) => {
    items.push({
      id: `${id}-${index}`,
      imageUrl: image.url + '?anchor=middlecenter&crop=auto&scale=both&w=546&h=411',
    })
  })
  

  return (
    <div className="trailer-list">
      <h3 className="title">
        <span>تریلر، تصاویر و جزئیات</span>
      </h3>
      <div className="row">
        <div className="col-12 p-0">
          {/* <SRLWrapper> */}
            <RowList
              ItemComponent={TrailerItem}
              data={{
                payloadType: 'TrailerList',
                payloadKey: id,
                items: items,
              }}
              placeholder={false}
            />
          {/* </SRLWrapper> */}
        </div>
      </div>
    </div>
  )
}

export default TrailerList
