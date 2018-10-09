import React, {Component} from 'react'
import { Layout, Icon, Avatar, Dropdown, Menu, Spin, Select, message } from 'antd'
import SiderComponent from '@/components/Sider'
import {_upLoginState} from '@/reducer/action'
import Routers from '@/views/router/Router'
import routerConfig from '../router/config'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import {_setLanguage} from '@/reducer/action'
import {bindActionCreators} from 'redux'
import Cookie from 'js-cookie'
import {getKey} from '../../utils/index'
import {withRouter, Link} from 'react-router-dom'
import './less/Home.less'
const {Content, Header} = Layout
const Option = Select.Option

class Home extends Component {
  constructor () {
    super ()
    this.state = {
      collapsed: false,
      visible: false,
      menuState: null,
      routerArray: [],
      routerKey: null,
      nowI: [0],
      locale: 'zh'
    }
  }
  _closeMenu = () => {
    this.setState({menuState: setTimeout(() => {
      this.setState({visible: false})
    }, 500)})
  }
  _openMenu = () => {
    const {menuState} = this.state
    this.setState({visible: true})
    clearTimeout(menuState)
  }
  _logout = () => {
    const {history} = this.props
    _upLoginState(false)
    Cookie.remove('token')
    history.push('/login')
  }
  componentWillReceiveProps = async() => {
    const {history} = this.props
    const {location} = history
    let key = await getKey(location.pathname)
    this.setState({routerKey: key})
  }
  _routerPath = (routerConfig, lastKey) => {
    let flag = []
    routerConfig = routerConfig.menus
    let key = null
    routerConfig.forEach(item => {
      if (item.component) {
        if (item.path === lastKey) {
          flag.push(item.title)
          key = item.key
          Cookie.set('key', key)
        }
      } else {
        item.childrens.forEach((less) => {
          if (less.path === lastKey) {
            flag.push(item.title)
            flag.push(less.title)
            key = less.key
            Cookie.set('key', key)
          }
        })
      }
    })
    let {routerArray, nowI} = this.state
    if (routerArray.every((item) => item.title !== flag[flag.length - 1])) {
      routerArray.push({
        title: flag[flag.length - 1],
        path: lastKey,
        routerKey: key
      })
      nowI.splice(0, 1, routerArray.length - 1)
    } else {
      routerArray.forEach((item, i) => {
        if (flag[flag.length - 1] === item.title) {
          nowI.splice(0, 1, i)
        }
      })
    }
    return flag
  }
  _setKeys = (key) => {
    this.setState({routerKey: key})
  }
  _closeAll = () => {
    let {history} = this.props
    history.push('/')
    this.setState({routerArray: [], routerKey: null})
  }
  _closeRouter = (index) => {
    let {routerArray} = this.state
    let {history} = this.props
    let {pathname} = history.location
    let flag = routerArray.splice(index, 1)
    let flagRouter = null
    if (flag[0].path === pathname) {
      if (index !== 0) {
        history.push(routerArray[index - 1].path)
        flagRouter = routerArray[index - 1].routerKey
      } else if (routerArray.length !== 0){
        history.push('/home/index')
        flagRouter = 'home'
      } else {
        history.push('/')
        flagRouter = ''
      }
    }
    if (flagRouter) flagRouter = [flagRouter]
    this.setState({
      routerArray: routerArray,
      routerKey: flagRouter
    })
  }
  _routerMessage = () => {
    let {history} = this.props
    history.push('/home/set/news')
  }
  _screenFull = () => {
    if (screenfull.enabled) {
      screenfull.request()
    }
  }
  _getLocale = (value) => {
    message.warn('请首先进行i18n国际化配置')
    return
    // _setLanguage(value)
    // this.setState({locale: value})
  }
  render() {
    const {collapsed, visible, routerArray, routerKey, nowI, locale} = this.state
    const {loginStatus, history, loadingState} = this.props
    let {pathname} = history.location
    const routerPath = this._routerPath(routerConfig, pathname)
    const menu = (
      <Menu 
        onMouseOver={this._openMenu}
        onMouseLeave={this._closeMenu}>
        <Menu.Item onClick={this._routerMessage}>
          <Icon type='notification'/>
          系统公告
        </Menu.Item>
        <Menu.Item onClick={this._logout}>
          <Icon type='logout' />
          退出登陆
        </Menu.Item>
      </Menu>
    )
    return (
      <Layout style={{height: '100%'}}>
        <div className="loading-box" style={loadingState? {display: 'flex'} : {display: 'none'}}>
          <Spin />
        </div>
        <SiderComponent 
          style={{height: '100%'}}
          collapsed={collapsed}
          routerKey={routerKey}
          setkey={this._setKeys}
          {...this.props}
        />
        <Layout>
          <Header className="header">
            <div className="router-and-switch">
              <Icon type={!collapsed? 'menu-fold': 'menu-unfold'} style={{fontSize: '28px'}} onClick={() => {this.setState({collapsed: !collapsed})}}/>
              <div className="router-box">
                {routerPath.map((item, i) => {
                  return <span key={i + 'routerPath'} className="router-paths">{item}</span>
                })}
              </div>
            </div>
            <div className="screen-full-box">
              <Select defaultValue="zh" value={locale} style={{ width: 80, marginRight: '20px' }} onChange={this._getLocale}>
                <Option value="zh">中文</Option>
                <Option value="en">English</Option>
              </Select>
              <Icon type="fullscreen" theme="outlined" onClick={this._screenFull} style={{marginRight: '20px', fontSize: '24px'}}/>
              <div>
                  <Avatar size={44} icon="user" 
                    onMouseOver={this._openMenu}
                    onMouseLeave={this._closeMenu}
                  />
                  <Dropdown overlay={menu} visible={visible}>
                    <div></div>
                  </Dropdown>
              </div>
            </div>
          </Header>
          <Content style={{flexDirection: 'column', minHeight: '100%', height: '100%'}}>
            <div className="router">
              <div className="router-path">
                {routerArray.map((item, i) => {
                  return <div className={i === nowI[0]? 'router-path-box now-router': 'router-path-box'} key={i + 'router'}>
                    <Link to={item.path}>
                      <span>
                        {item.title}
                      </span>
                    </Link>
                    <Icon type='minus-circle' style={{marginLeft: '10px'}} onClick={() => {this._closeRouter(i)}} />
                  </div>
                })}
              </div>
              <div className="close-all" onClick={this._closeAll}>
                关闭所有
                <Icon type="close-circle" theme="outlined" style={{marginLeft: '10px'}}/>
              </div>
            </div>
            <Routers loginStatus={loginStatus} {...this.props}/>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.auth.loginStatus,
    loadingState: state.load.loadingState
  }
}

const mapDispatchToProps = dispatch => ({
  upLoginState: bindActionCreators(_upLoginState, dispatch),
  setLanguage: bindActionCreators(_setLanguage, dispatch)
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))