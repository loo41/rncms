import React, {Component} from 'react'
import {Layout, Switch} from 'antd'
import SiderFactory from './SiderFactory'
import routerConfig from '../views/router/config'
import logoImg from '@/assets/img/yg.png'
import {getKey} from '../utils/index'
import './less/Sider'

const {Sider} = Layout

class SiderComponent extends Component {
  constructor () {
    super()
    this.state = {
      motive: 'dark',
      pattern: 'inline',
      defaultSelectedKeys: ['home/set']
    }
  }
  componentWillMount () {
    this._setDefKey()
  }
  _setDefKey = async() => {
    const {history} = this.props
    const {location} = history
    let defKey = await getKey(location.pathname)
    await this.setState({defaultSelectedKeys: defKey})
  }
  _changeMode = () => {
    const {pattern} = this.state
    let flag = pattern === 'inline'? 'vertical': 'inline'
    this.setState({pattern: flag})
  }
  _changeTheme = () => {
    const {motive} = this.state
    let flag = motive === 'dark'? 'light': 'dark'
    this.setState({motive: flag})
  }
  _changeKeys = ({ item, key, keyPath }) => {
    const {setkey} = this.props
    setkey(key)
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.routerKey) {
      this.setState({defaultSelectedKeys: nextProps.routerKey})
    }
  }
  render() {
    const {collapsed, routerKey} = this.props
    const {motive, pattern, defaultSelectedKeys} = this.state
    return(
      <Sider collapsed={collapsed} theme={motive}>
        <div className="logo">
          <a href="https://github.com/youngon-cn" target="_Blank">
            <img src={logoImg} style={{width: '100%'}}/>
          </a>
        </div>
        <SiderFactory
          menus={routerConfig.menus}
          theme={motive}
          mode={pattern}
          selectedKeys={routerKey || defaultSelectedKeys}
          onClick={this._changeKeys}
          defaultSelectedKeys={defaultSelectedKeys}
        />
        <div className="footer" style={collapsed? {display: 'none'} : {display: 'flex'}}>
          <Switch onChange={this._changeMode} style={{ marginRight: '5px' }}/> 模式
          <span className="ant-divider" style={{ margin: '0 1em' }} />
          主题 <Switch onChange={this._changeTheme} style={{ marginLeft: '5px', transform: 'rotate(180deg)' }}/>
        </div>
      </Sider>
    )
  }
}



export default SiderComponent