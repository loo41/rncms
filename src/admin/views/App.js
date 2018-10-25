import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {_upLoginState} from '@/reducer/action'
import Loadable from "react-loadable"
import Home from './pages/Home'
import NotFound from './notfound/NotFound'
import Cookies from 'js-cookie'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

const Loading = () =>  <div>loading...</div>
const Login = Loadable({loader: () => import('./Login/Login'), loading: Loading})

class App extends Component {
  componentWillMount () {
    const {upLoginState} = this.props
    if (Cookies.get('token')) {
      upLoginState(true)
    }
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home/index" push />} /> 
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return{}
}

const mapDispatchToProps = dispatch => ({
  upLoginState: bindActionCreators(_upLoginState, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
