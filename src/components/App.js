import React from 'react'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { HomePage, 
  RegisterPage, 
  NotFoundPage, 
  LoginPage, 
  EmailPage,
  NewPasswordPage,
  RegisterSuccessPage, 
  EmailCheckPage,
  SearchResultPage,
  CreateServicePage,
  ServicePage,
  UserPage,
  EditProfilePage,
  StatusServicePage,
  EditServiceListPage,
  EditServicePage,
  SelectServicePage,
  PaymentPage,
  AdminPage } from 'components'
import { withCookies, Cookies } from 'react-cookie'
import PropTypes, { instanceOf } from 'prop-types'


// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  body {
    margin: 0;
  }
`

class App extends React.Component{

  static propTypes = {
		cookies: instanceOf(Cookies).isRequired
  }
  
  componentWillMount() {
		global.cookies = this.props.cookies
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps.location.pathname != this.props.location.pathname) {
      window.scrollTo(0,0)
		}
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/register" component={RegisterPage} exact/>
          <Route path="/registersuccess" component={RegisterSuccessPage} exact/>
          <Route path="/emailcheck" component={EmailCheckPage} exact/>
          <Route path="/login" component={LoginPage} exact/>
          <Route path="/resetpassword" component={EmailPage} exact/>
          <Route path="/newpassword/:token" component={NewPasswordPage} exact/>
          <Route path="/search/:type" component={SearchResultPage} exact/>

          <Route path="/serviceedit/:service" component={NotFoundPage} exact/>
          <Route path="/servicewarning" component={NotFoundPage} exact/>
          <Route path="/servicesuccess" component={NotFoundPage} exact/>
          <Route path="/reservations/:status" component={StatusServicePage} exact/>
          <Route path="/reservations/:reservationId/:status" component={SelectServicePage} exact/>

          <Route path="/createservice" component={CreateServicePage} exact/>
          <Route path="/edit/users/:user" component={EditProfilePage} exact/>
          <Route path="/edit/service/" component={EditServiceListPage} exact/>
          <Route path="/edit/service/:serviceid" component={EditServicePage} exact/>
          <Route path="/users/:user" component={UserPage} exact/>
          <Route path="/users/:user/:service" component={ServicePage} exact/>
          <Route path="/admin" component={AdminPage} exact/>
          <Route path="/payment" component={PaymentPage} exact/>
          <Route component={NotFoundPage} />
          
        </Switch>
      </ThemeProvider>
    )
  }
}


export default withRouter(withCookies(App))
