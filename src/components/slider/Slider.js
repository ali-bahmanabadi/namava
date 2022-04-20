import React, { useEffect } from 'react'
import './Slider.scss'
import SliderItem from './SliderItem'
import axios from '../../utils/axios'
import { types, useSlider } from '../../context/slider/SliderContext'
import config from '../../config'
import ChangeSlide from './ChangeSlide'

const fetchSlider = async (dispatch, sliderId) => {
  dispatch({ type: types.SET_LOADING })
  let url = config.sections.Slider.url.replace('{{SLIDER_ID}}', sliderId)
  const { data: { succeeded, result, errors } } = await axios.get(url)
  

  if (succeeded) {
    dispatch({
      type: types.SET_ITEMS,
      items: result,
      id: sliderId,
    })
  } else {
    dispatch({
      type: types.SET_ERRORS,
      errors,
    })
  }
}

const Slider = ({ sliderId }) => {
  const { state, dispatch, nextSlide, previousSlide } = useSlider()

  useEffect(() => {
    fetchSlider(dispatch, sliderId)
  }, [dispatch, sliderId])

  useEffect(() => {
    let sliderTimeoutHandler = undefined
    sliderTimeoutHandler = setTimeout(() => {
      nextSlide()
    }, config.sections.Slider.time)
    return () => {
      clearTimeout(sliderTimeoutHandler)
    }
  })

  return (
    <div className="col-12 p-0 slider">
      {state.succeeded &&
        state.items.length > 0 &&
        state.items.map((sliderItem, index) => (
          <SliderItem
            key={sliderItem.id}
            slider={{
              ...sliderItem,
              title: sliderItem.caption
            }}
            className={
              state.currentSlide === index
                ? 'active'
                : state.previousSlide === index
                ? 'previous'
                : ''
            }
          />
        ))}
      <ChangeSlide back={previousSlide} next={nextSlide} />
    </div>
  )
}

export default Slider
