// https://github.com/diegohaz/arc/wiki/Example-app
import 'react-hot-loader/patch'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { basename } from 'config'
import { CookiesProvider } from 'react-cookie';
import App from 'components/App'

const renderApp = () => (
  <CookiesProvider>
    <BrowserRouter basename={basename}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </CookiesProvider>
)

const root = document.getElementById('app')
render(renderApp(), root)

if (module.hot) {
  module.hot.accept('components/App', () => {
    require('components/App')
    render(renderApp(), root)
  })
}
