import React, { useEffect, useReducer } from 'react'
import { fetchData } from '../../utils/fetchData'
import SingleRowList from './SingleRowList'
import { RealLazyLoad } from 'real-react-lazyload'
import './MultiLineList.scss'
import config from '../../config'

const types = {
  SET_LOADING: 'SET_LOADING',
  SET_ITEMS: 'SET_ITEMS',
  SET_ERROR: 'SET_ERROR',
  SET_FETCH_REQUEST: 'SET_FETCH_REQUEST',
  SET_ITEMS_AND_ITEMS_PROPS: 'SET_ITEMS_AND_ITEMS_PROPS',
}

const multiLineListReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case types.SET_ITEMS:
      return {
        ...state,
        error: false,
        items: action.items,
        loading: false,
        pi: action.pi,
        showMore:
          action.showMore !== undefined ? action.showMore : state.showMore,
        fetchRequest:
          action.fetchRequest !== undefined
            ? action.fetchRequest
            : state.fetchRequest,
      }
    case types.SET_ITEMS_AND_ITEMS_PROPS:
      return {
        ...state,
        error: false,
        items: action.items,
        loading: false,
        itemsProps: action.itemsProps,
      }
    case types.SET_ERROR:
      return {
        ...state,
        items: [],
        error: action.error,
        loading: false,
      }
    case types.SET_FETCH_REQUEST:
      return {
        ...state,
        fetchRequest: true,
      }
    default:
      throw Error('in MultiLineListReducer action type in false!')
  }
}

const MultiLineList = React.forwardRef(
  (
    {
      className,
      data: {
        payloadType,
        payloadKey,
        title,
        items: defaultItems,
        key = 'id',
        maxItems,
        slug,
        options = {},
        perRow = 7,
        showMore = false,
        pi,
      },
      firstRequest = false,
      ItemComponent,
      placeholder = false,
      preview = false,
    },
    ref
  ) => {
    const initialState = {
      items: defaultItems || [],
      loading: false,
      error: false,
      showMore: showMore,
      pi: pi,
      fetchRequest: firstRequest,
      itemsProps: defaultItems ? payloadKey : false,
    }

    const [state, dispatch] = useReducer(
      multiLineListReducer,
      initialState,
      (initState) => initState
    )
    const { items, loading, error, fetchRequest } = state

    const fetchNextData = (pi) => {
      let ps = 10
      let section = config.sections[payloadType]
      if (section && section.ps !== undefined) {
        ps = section.ps
      }
      fetchData(
        payloadKey,
        payloadType,
        (result) => {
          dispatch({
            type: types.SET_ITEMS,
            items: result,
            pi: pi,
            showMore: (result && result.length) > ps ? state.showMore : false,
            fetchRequest:
              (result && result.length) > ps ? state.fetchRequest : false,
          })
        },
        (error) => {
          dispatch({ type: types.SET_ERROR, error })
        },
        (isLoading) => {
          if (isLoading === true) { dispatch({ type: types.SET_LOADING, loading: isLoading })}
        },
        { ...options, pi }
      )
    }
    useEffect(() => {
      if (
        fetchRequest &&
        items.length === 0 &&
        loading === false &&
        error === false
      ) {
        fetchNextData(state.pi !== undefined ? state.pi + 1 : undefined)
      } else if (
        state.itemsProps !== false &&
        state.itemsProps !== payloadKey
      ) {
        dispatch({
          type: types.SET_ITEMS_AND_ITEMS_PROPS,
          items: defaultItems,
          itemsProps: payloadKey,
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      payloadKey,
      payloadType,
      placeholder,
      fetchRequest,
      dispatch,
      error,
      items.length,
      loading,
      options,
    ])

    const getRows = () => {
      let rows = []
      let row = 0
      let rowItems = []
      let max = items.length
      let z = 0
      if (maxItems !== null && maxItems < max) {
        max = maxItems
      }
      for (let i = 0; i < max; i++) {
        rowItems[z++] = items[i]
        if (z === perRow || i + 1 === max) {
          rows.push(
            <SingleRowList
              showMore={i + 1 === max ? state.showMore : false}
              showMoreCallback={() => {
                if (state.showMore === true) {
                  fetchNextData(state.pi + 1)
                }
              }}
              key={`single-row-${payloadType}-${payloadKey}-${key}-${i}`}
              data={{
                payloadType,
                payloadKey,
                items: rowItems,
                key,
                slug,
              }}
              ItemComponent={ItemComponent}
              placeholder={false}
              preview={preview}
            />
          )
          z = 0
          rowItems = []
        }
      }

      return rows
    }

    let canIRender = items.length > 0 && error === false && loading === false

    return (
      <div ref={ref} className={`multi-list col-12 p-0 ${className}`}>
        {title && (
          <div className="multi-title">
            <h3>{title}</h3>
          </div>
        )}
        {canIRender && getRows()}
      </div>
    )
  }
)

export default MultiLineList
