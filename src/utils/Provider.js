import { MenusProvider } from '../context/menus/MenusContext'
import { SliderProvider } from '../context/slider/SliderContext'
// import SimpleReactLightbox from 'simple-react-lightbox'


const Provider = ({ children }) => {
  return (
    <MenusProvider>
      {/* <SimpleReactLightbox> */}
        <SliderProvider>
          {children}
        </SliderProvider>
      {/* </SimpleReactLightbox> */}
    </MenusProvider>
  )
}

export default Provider
