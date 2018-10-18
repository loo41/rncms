import React, {Component} from 'react'
import {Divider, Input, Icon, Radio, Button, message} from 'antd'
import {addUser} from '@/api/user'
import {checkUserInfo} from '../utils/AdminUtil'
import '../less/UserApi'
const RadioGroup = Radio.Group


export default class UserApi extends Component {
  constructor () {
    super ()
    this.state = {
      info: {
        username: '',
        password: '',
        email: '',
        phone: '',
        sex: 1
      }
    }
  }
  _getUsername = (e) => {
    let {info} = this.state
    info.username = e.target.value
    this.setState({info})
  }
  _getPassword = (e) => {
    let {info} = this.state
    info.password = e.target.value
    this.setState({info})
  }
  _getEmail = (e) => {
    let {info} = this.state
    info.email = e.target.value
    this.setState({info})
  }
  _getPhone = (e) => {
    let {info} = this.state
    info.phone = e.target.value
    this.setState({info})
  }
  _getSex= (e) => {
    let {info} = this.state
    info.sex = e.target.value
    this.setState({info})
  }
  _addUser = async () => {
    let {info} = this.state
    if (!Object.values(info).every((item) => item !== '')) return message.warn('不能为空')
    if (!await checkUserInfo(info)) return
    addUser(info).then((result) => {
      if (!result) return
      message.success('添加成功')
      this._clear()
    })
  }
  _clear = () => {
    this.setState({
      info: {
        username: '',
        password: '',
        email: '',
        phone: '',
        sex: 1
      }
    })
  }
  render () {
    const {info} = this.state
    const options = [
      { label: '男', value: 1 },
      { label: '女', value: 2}
    ]
    return (
      <div style={{padding: '20px'}}>
        <div className="user-box">
          <div className="user-title">添加用户api ( 要实现复杂用户注册逻辑需要DIY ) </div>
          <Divider />
          <div className="user-args">
            <div className="user-api">/user</div>
            <div className="add-user-but">
              <Button type="primary" onClick={this._addUser}>
                添加
              </Button>
            </div>
          </div>
          <Divider />
          <div className="user-content">
            <div style={{width: '400px', margin: '0 auto'}}>
              <div>
                <Input
                  placeholder="username"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={info.username}
                  onChange={this._getUsername}
                />
              </div>
              <div style={{marginTop: '20px'}}>
                <Input
                  placeholder="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={info.password}
                  onChange={this._getPassword}
                />
              </div>
              <div style={{marginTop: '20px'}}>
                <Input
                  placeholder="email"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={info.email}
                  onChange={this._getEmail}
                />
              </div>
              <div style={{marginTop: '20px'}}>
                <Input
                  placeholder="phone"
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={info.phone}
                  onChange={this._getPhone}
                />
              </div>
              <div style={{marginTop: '20px'}}>
                <RadioGroup options={options} onChange={this._getSex} value={info.sex}/>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}