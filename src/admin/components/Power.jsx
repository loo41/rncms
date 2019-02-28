import React, {Component} from 'react'
import routerConfig from '../views/router/config'
import {Tree} from 'antd'

const TreeNode = Tree.TreeNode

export default class Power extends Component {
  constructor () {
    super(),
    this.state = {
      checkedKeys: []
    }
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.childrens) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.childrens)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  }
  _selectPower = (checkedKeys) => {
    this.props._selectPower(checkedKeys)
  }
  render() {
    const {defaultCheckedKeys, disabled, checkedKeys, checkable} = this.props
    let flagCheckable = checkable
    if (!flagCheckable && String(flagCheckable) !== 'false') flagCheckable = true
    return(
      <Tree
        checkable={flagCheckable}
        defaultCheckedKeys={defaultCheckedKeys}
        checkedKeys={checkedKeys || defaultCheckedKeys}
        disabled={disabled}
        onCheck={this._selectPower}
      >
        {this.renderTreeNodes(routerConfig.menus)}
      </Tree>
    )
  }
}