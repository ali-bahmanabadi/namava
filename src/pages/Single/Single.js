import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comments from '../../components/Comments/Comments'
import MultiLineList from '../../components/List/MultiLineList'
import TrailerList from '../../components/List/TrailerList'
import MovieDetail from '../../components/movie/MovieDetail'
import MovieItem from '../../components/MovieItem/MovieItem'
import PersonItem from '../../components/PersonItem/PersonItem'
import Seasons from '../../components/Seasons/Seasons'
import { fetchData } from '../../utils/fetchData'
import './Single.scss'

const Single = () => {
  const { type, id, name } = useParams()
  const [state, setState] = useState({
    id: undefined,
    data: null,
    error: false,
    loading: false,
  })

  useEffect(() => {
    if (
      state.loading === false &&
      state.error === false &&
      (state.data === null || state.id !== id)
    ) {
      let payloadType =
        type === 'series' ? 'SinglePageSeries' : 'SinglePageMovie'
      fetchData(
        id,
        payloadType,
        (result) => {
          setState({
            ...state,
            id: id,
            data: result,
            error: false,
            loading: false,
          })
        },
        () => {},
        (isLoading) => {
          if (isLoading) {
            setState({ ...state, loading: true })
          }
        }
      )
    }
  }, [state, id, type])

  // console.log("single page","type: ", type,"id: ", id,"name: ", name, state);

  return (
    <div className="container-fluid single">
      {state.loading === false && state.data !== null && state.id === id && (
        <React.Fragment>
          <div className="row p-0">
            <MovieDetail
              data={state.data}
              topMedia={true}
              loading={state.loading}
            />
          </div>
          {state.data.seasons && (
            <div className="row">
              <div className="col-12 px-5 negative-margin">
                <Seasons seasons={state.data.seasons} />
              </div>
            </div>
          )}
          {state.data.slideImageList && (
            <div
              className={`row px-5 ${
                state.data.seasons ? '' : 'negative-margin'
              }`}
            >
              <div className="col-12">
                <TrailerList id={id} images={state.data.slideImageList} />
              </div>
            </div>
          )}
          <div className="row">
            {state.data.casts && state.data.casts.length > 0 && (
              <MultiLineList
                data={{
                  payloadType: 'PersonList',
                  payloadKey: id,
                  items: state.data.casts,
                  key: 'castId',
                  slug: 'castRole',
                  maxItems: 14,
                }}
                preview={false}
                ItemComponent={PersonItem}
                placeholder={false}
              />
            )}
          </div>
          <div className="row">
            <MultiLineList
              data={{
                payloadType: 'SinglePageRelated',
                payloadKey: id,
                options: {
                  categoryId:
                    state.data.categories && state.data.categories.length > 0
                      ? state.data.categories[0].categoryId
                      : undefined,
                },
                maxItems: 14,
              }}
              firstRequest={true}
              preview={true}
              ItemComponent={MovieItem}
            />
          </div>
          <Comments mediaId={id} />
        </React.Fragment>
      )}
    </div>
  )
}

export default Single
