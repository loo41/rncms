import React, {Component} from 'react'
import { Transfer } from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addApi} from '@/api/config.js'
import {_loading} from '@/reducer/action'
import {powerList, setPower} from '@/api/power'
import '../less/Power'

class Power extends Component {
  constructor () {
    super()
    this.state = {
      targetKeys: [],
      mockData: [],
      _id: null
    }
  }
  componentWillMount () {
    this._setData()
    this._getDefPower()
  }
  _getDefPower () {
    let {loading} = this.props
    loading(true)
    powerList().then((result) => {
      loading(false)
      if (!result) return
      result = result.data
      const {list, _id} = result
      this.setState({targetKeys: list, _id})
    })
  }
  _setData = () => {
    let flag = []
    Object.values(addApi).forEach((item) => {
      flag.push({
        api: item.api,
        key: item.api,
        des: item.des
      })
    })
    this.setState({mockData: flag})
  }
  _handleChange = (targetKeys) => {
    setPower({router: targetKeys, _id: this.state._id}).then((result) => {
      if (!result) return
      this.setState({ targetKeys })
    })
  }
  renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.des}
      </span>
    )
    return {
      label: customLabel,
      value: item.api,
    }
  }
  render() {
    const {targetKeys, mockData} = this.state
    return (
      <div className="power-box">
        <Transfer
          dataSource={mockData}
          listStyle={{
            width: 400,
            height: 400,
          }}
          titles={['需要检测权限api', '无需检测权限api']}
          targetKeys={targetKeys}
          onChange={this._handleChange}
          render={this.renderItem}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{}
}

const mapDispatchToProps = dispatch => ({
  loading: bindActionCreators(_loading, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Power)