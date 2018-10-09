import React from 'react'
import {Menu, Icon} from 'antd'
import { Link } from 'react-router-dom'

const renderMenuItem = item => (
  <Menu.Item
    key={item.key}
  >
    <Link to={item.path}>   
      {item.icon && <Icon type={item.icon} />}
      <span className="nav-text">{item.title}</span>
    </Link>
  </Menu.Item>
)

const renderSubMenu = item => ( 
  <Menu.SubMenu
    key={item.key}
    title={
      <span>
        {item.icon && <Icon type={item.icon} />}
        <span className="nav-text">{item.title}</span>
      </span>
    }
  >
    {item.childrens.map(item => renderMenuItem(item))}
  </Menu.SubMenu>
)

export default ({ menus, ...props }) => (
  <Menu {...props}>
    {menus && menus.map(item => 
      item.childrens ? renderSubMenu(item) : renderMenuItem(item)
    )}
  </Menu>
)