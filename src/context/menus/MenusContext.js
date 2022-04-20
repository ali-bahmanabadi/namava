import React, { createContext, useReducer, useContext } from 'react'

const MenusContext = createContext(null)

const initialState = {
  data: null,
  home: null,
  loading: false,
  errors: [],
  succeeded: false,
}

export const types = {
  SET_LOADING: 'SET_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERRORS: 'SET_ERRORS',
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: true }
    case types.SET_DATA:
      return {
        ...state,
        loading: false,
        id: action.id,
        errors: [],
        succeeded: 'true',
        data: action.data,
        home: action.home,
      }
    case types.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.errors,
        data: null,
        home: null,
        succeeded: false,
      }
    default:
      throw Error(`action.type is incorrect! => ${action.type}`)
  }
}

const MenusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <MenusContext.Provider value={{ state, dispatch }}>
      {children}
    </MenusContext.Provider>
  )
}

const useMenus = () => {
  const context = useContext(MenusContext)
  if (!context) {
    throw Error('useMenus context')
  }
  const { dispatch, state } = context

  return { state, dispatch }
}

export { MenusProvider, useMenus }
