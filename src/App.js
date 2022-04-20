import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Single from './pages/Single/Single'
import Provider from './utils/Provider'

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route
            path="/"
            exact
            render={({ location }) => {
              if (location.state && location.state.showList === true) {
                return <List {...location.state} />
              }
              return <Home />
            }}
          />

          <Route
            path={'/:type/:id([0-9]+):name'}
            exact={true}
            component={Single}
          />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}

export default App
