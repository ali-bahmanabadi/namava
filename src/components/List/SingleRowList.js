import React, {  useEffect, useState } from 'react'
import PreviewItem from '../movie/PreviewItem'
import './SingleRowList.scss'
import {RealLazyLoad} from 'real-react-lazyload'

const SingleRowList = React.forwardRef(
  (
    {
      className,
      data: { payloadType, payloadKey, items, key, slug },
      ItemComponent,
      placeholder = false,
      preview = false,
      showMore = false,
      showMoreCallback
    },
    ref
  ) => {
    const [previewState, setPreviewState] = useState({
      id: undefined,
      action: false,
    })

   

    const togglePreview = (id) => {
      setPreviewState((oldState) => {
        let newState = { ...oldState }
        if (id !== oldState.id) {
          newState.id = id
          newState.active = true
        } else {
          newState.active = !oldState.active
        }
        return newState
      })
    }

    const getItems = () => {
      let content = []
      if (placeholder || (placeholder === false && items.length === 0)) {
        let count = 8
        if (typeof placeholder === 'number') {
          count = placeholder
        }
        for (let i = 0; i < count; i++) {
          content.push(
            <ItemComponent
              key={`single-row-item-${payloadKey}-${payloadType}-${i}-${slug}`}
              placeholder={true}
            />
          )
        }
      } else {
        content = items.map((item, index) => (
          <ItemComponent
            className={
              item[key] === previewState.id && previewState.active === true
                ? 'active'
                : ''
            }
            togglePreview={togglePreview}
            key={`row-list-item-${item.id}-${index}`}
            item={item}
          />
          
        ))
      }
      if (showMore === true) {
        content.push(
          <RealLazyLoad
            key={`show-more-real-lazy-load`}
            placeholder={
              <div
                key={`single-row-item-${payloadKey}-${payloadType}-${slug}-placeholder`}
              >
                <ItemComponent placeholder={true} />
              </div>
            }
            componentEntryCallback={() => {
              if (typeof showMoreCallback === 'function') {
                showMoreCallback()
              }
              return true
            }}
          >
            <div>
              <ItemComponent
                key={`single-row-item-${payloadKey}-${payloadType}-${slug}-placeholder`}
                placeholder={true}
              />
            </div>
          </RealLazyLoad>
        )
      }
      return content
    }

    let canIRender = items.length > 0

    return (
      <div ref={ref} className={`single-row col-12 p-0 ${className}`}>
        {canIRender && ItemComponent !== undefined && (
          <div className="list-container">
            <div className="row">{getItems()}</div>
          </div>
        )}
        {preview === true && canIRender && (
          <PreviewItem id={previewState.id} isActive={previewState.active} />
        )}
      </div>
    )
  }
)

export default SingleRowList
