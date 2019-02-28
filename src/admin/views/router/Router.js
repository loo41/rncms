import React, {Component} from 'react'
import Routes from './config'
import Cookies from 'js-cookie'
import ComponentList from '@/views/pages'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

class RouterComponent extends Component {
  constructor () {
    super()
  }
  requireLogin = (component, loginStatus) => {
    if (!loginStatus || !Cookies.get('token')) return <Redirect to={'/login'} />
    return component
  }
  render() {
    const {loginStatus} = this.props
    return(
      <Switch>
        {Object.keys(Routes).map(key => 
          Routes[key].map(item => {
            const route = (r) => {
              const Components = ComponentList[r.component]
              return (
                <Route
                  key={r.key}
                  exact
                  path={r.path || ''}
                  render={props => (loginStatus && Cookies.get('token'))? 
                    <Components {...props} />
                    : this.requireLogin(<Components {...props}/>, loginStatus)}
                />
              )
            }
            return item.component? route(item) : item.childrens.map(r => route(r))
          })
        )}
        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    )
  }
}

export default RouterComponent