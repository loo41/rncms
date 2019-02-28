import React, {Component} from 'react'
import {Menu, Icon} from 'antd'

export default class SiderFactory extends Component {
  renderMenuItem = item => (
    <Menu.Item
      key={item.key}
    >
      <div onClick={() => {this._gotoUrl(item.path)}}>   
        {item.icon && <Icon type={item.icon} />}
        <span className="nav-text">{item.title}</span>
      </div>
    </Menu.Item>
  )
  
  _gotoUrl = itemurl => { 
    const { history, location } = this.props
    if (location.pathname === itemurl) { 
      return
    } else { 
      history.push(itemurl);
    } 
  }
  
  renderSubMenu = item => ( 
    <Menu.SubMenu
      key={item.key}
      title={
        <span>
          {item.icon && <Icon type={item.icon} />}
          <span className="nav-text">{item.title}</span>
        </span>
      }
    >
      {item.childrens.map(item => this.renderMenuItem(item))}
    </Menu.SubMenu>
  )  
  render () {
    const {menus} = this.props
    return (
      <Menu {...this.props}>
        {menus && menus.map(item => 
          item.childrens ? this.renderSubMenu(item) : this.renderMenuItem(item)
        )}
      </Menu>
    )
  }
}