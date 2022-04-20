import React, { createContext, useReducer, useContext } from 'react'

const SliderContext = createContext(null)

const initialState = {
  id: undefined,
  items: [],
  loading: false,
  errors: [],
  succeeded: false,
  currentSlide: 0,
  previousSlide: null,
}

export const types = {
  SET_LOADING: 'SET_LOADING',
  SET_ITEMS: 'SET_ITEMS',
  SET_ERRORS: 'SET_ERRORS',
  SET_SLIDE: 'SET_SLIDE',
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: true }
    case types.SET_ITEMS:
      return {
        ...state,
        loading: false,
        id: action.id,
        errors: [],
        succeeded: 'true',
        items: action.items,
      }
    case types.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.errors,
        items: [],
        succeeded: false,
      }
    case types.SET_SLIDE:
      return {
        ...state,
        currentSlide: action.currentSlide,
        previousSlide: action.previousSlide,
      }
    default:
      throw Error(`action.type is incorrect! => ${action.type}`)
  }
}

const SliderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <SliderContext.Provider value={{ state, dispatch }}>
      {children}
    </SliderContext.Provider>
  )
}

const useSlider = () => {
  const context = useContext(SliderContext)
  if (!context) {
    throw Error('useSlider context')
  }
  const { dispatch, state } = context

  const nextSlide = () => {
    let previousSlide = state.currentSlide
    let currentSlide = (state.currentSlide + 1) % state.items.length
    dispatch({
      type: types.SET_SLIDE,
      currentSlide,
      previousSlide,
    })
  }

  const previousSlide = () => {
    let previousSlide = state.currentSlide
    let currentSlide =
      (state.currentSlide + state.items.length - 1) % state.items.length
    dispatch({
      type: types.SET_SLIDE,
      currentSlide,
      previousSlide,
    })
  }

  return { state, dispatch, nextSlide, previousSlide }
}

export { SliderProvider, useSlider }
