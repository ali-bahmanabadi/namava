import React, { useEffect } from 'react'
import AdsItem from '../../components/AdsItem/AdsItem'
import BannerItem from '../../components/BannerItem/BannerItem'
import RowList from '../../components/List/RowList'
import Slider from '../../components/slider/Slider'
import config from '../../config'
import { types, useMenus } from '../../context/menus/MenusContext'
import axios from '../../utils/axios'
import { getItemComponent } from '../../utils/functions'

const fetchMenus = async (dispatch) => {
  dispatch({ type: types.SET_LOADING })
  const {
    data: { succeeded, result, error },
  } = await axios.get('api/v1.0/menus')
  if (succeeded === true && error === null) {
    const homePageIndex = result.findIndex((item) => item.slug === 'index')
    let home = {}
    if (homePageIndex > -1) {
      home = result[homePageIndex]
    }
    dispatch({ type: types.SET_DATA, home: home, data: result })
  } else {
    dispatch({ type: types.SET_ERRORS, error: error })
  }
}

const Home = () => {
  
  const { state: menus, dispatch } = useMenus()
  useEffect(() => {
    if (
      menus.loading === false &&
      menus.succeeded === false &&
      menus.errors.length === 0
      ) {
        fetchMenus(dispatch)
      }
  }, [dispatch, menus])

  return ( 
    <div className="container-fluid">
      <div className="row">
        {!menus.loading &&
          menus.succeeded &&
          menus.home.pageItems.map(
            ({ payloadType, payloadKey, ...pageItem }) => {
              let preview = false
              // eslint-disable-next-line default-case
              switch (payloadType) {
                case config.pageItemsType.Slider:
                  return (
                    <Slider
                      key={`page-section-${pageItem.pageItemId}`}
                      sliderId={payloadKey}
                    />
                  )
                case config.pageItemsType.Latest:
                case config.pageItemsType.PostGroup:
                case config.pageItemsType.LatestEpisods:
                case config.pageItemsType.CategoryGroup:
                case config.pageItemsType.ExclusiveDubs:
                  preview = true
                  const itemComponent = getItemComponent(payloadType)
                  return <RowList preview={preview} key={`page-section-${pageItem.pageItemId}`}
                    data={{
                      payloadKey,
                      payloadType,
                      title: pageItem.caption
                    }}
                    ItemComponent={itemComponent}
                  />
                case config.pageItemsType.Advertisement:
                  return <RowList key={`page-section-${pageItem.pageItemId}`} data={{
                    payloadType,
                    payloadKey
                  }} ItemComponent={AdsItem} />
                case config.pageItemsType.BannerGroup:
                  return <RowList className="banner" key={`page-section-${pageItem.pageItemId}`} data={{
                    payloadType,
                    payloadKey
                  }} ItemComponent={BannerItem} />
                  
              }
            }
          )}
      </div>
    </div>
  )
}

export default Home
