import React, {Component} from 'react'
import { 
  Table, Modal, Icon, Input, 
  Switch, Radio, Button,
  message
} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {_loading} from '@/reducer/action'
import Power from '@/components/Power'
import '../less/Admin'
import {checkUser} from '../utils/AdminUtil'
import {addUser, userList, delectAdmin, updateUser} from '@/api/admin'
const RadioGroup = Radio.Group

class Admin extends Component {
  constructor () {
    super()
    this.state = {
      columns: [
        {title: '账号', dataIndex: 'username', key: 'username'},
        {title: '等级', dataIndex: 'superAdmin', key: 'superAdmin', render: (text) => (
          text? '超级管理员' : '普通管理员'
        )},
        {title: '邮箱', dataIndex: 'email', key: 'email'},
        {title: '电话', dataIndex: 'phone', key: 'phone'},
        {title: '权限', key: 'power', render: (text, record, index) => (
          <div style={{cursor: 'pointer'}} onClick={() => {this._lookPower(text, record, index)}}><Icon type="switcher" />查看</div>
        )},
        {title: '操作', dataIndex: 'operation', align: 'center', key: 'operation', render: (text, record, index) => (
          <div>
            <Button type="primary" onClick={() => {this._changeUserInfo(text, record, index)}}>
              <Icon type="form" />更改
            </Button>
            <Button type="primary" type="danger" style={{marginLeft: '10px'}} onClick={() => {this._openAdminDelTip(text, record, index)}}>
              <Icon type="delete" />删除
            </Button>
          </div>
        )}
      ],
      data: [],
      powerDfKeys: [],
      powerVisible: false,
      addUserVisible: false,
      changeType: false,
      adminVisible: false,
      adminID: null,
      superAdmin: false,
      info: {
        username: '',
        password: '',
        email: '',
        phone: '',
        power: [],
        effect: true,
        receiveMail: false,
        superAdmin: false
      }
    }
  }
  componentWillMount () {
    this._userList()
  }
  _userList = () => {
    const {loading} = this.props
    loading(true)
    userList().then((result) => {
      loading(false)
      if (!result) return
      result = result.data
      this.setState({data: result.user})
    })
  }
  _openAdminDelTip = (text, record, index) => {
    this.setState({adminVisible: true, adminID: record._id})
  }
  _delectAdmin = () => {
    const {adminID} = this.state
    delectAdmin({_id: adminID}).then((result) => {
      if (!result) return
      message.success('移除成功')
      this._hideModal()
      this._userList()
    })
  }
  _openAddUser = () => {
    this.setState({addUserVisible: true})
  }
  _lookPower = (text, record, index) => {
    this.setState({
      powerVisible: true,
      powerDfKeys: JSON.parse(JSON.stringify(record.power)),
      superAdmin: record.superAdmin
    })
  }
  _changeUserInfo = (text, record, index) => {
    this.setState({info: JSON.parse(JSON.stringify(record))})
    this._openAddUser()
    this.setState({changeType: true})
  }
  _selectPower = (power) => {
    let {info} = this.state
    info.power = power
    this.setState({info})
  }
  _selectGread = (e) => {
    let {info} = this.state
    info.superAdmin = e.target.value
    this.setState({info})
  }
  _onChangeUserName = (e) => {
    let {info} = this.state
    info.username = e.target.value
    this.setState({info})
  }
  _onChangePassword = (e) => {
    let {info} = this.state
    info.password = e.target.value
    this.setState({info})
  }
  _onChangeEmail = (e) => {
    let {info} = this.state
    info.email = e.target.value
    this.setState({info})
  }
  _onChangePhone = (e) => {
    let {info} = this.state
    info.phone = e.target.value
    this.setState({info})
  }
  _checkIsEffect = (state) => {
    let {info} = this.state
    info.effect = state
    this.setState({info})
  }
  _checkIsMail = (state) => {
    let {info} = this.state
    info.receiveMail = state
    this.setState({info})
  }
  _hideModal = () => {
    this.setState({
      powerVisible: false, 
      addUserVisible: false, 
      adminVisible: false,
      superAdmin: false
    })
    this._clear()
  }
  _clear = () => {
    let flag = {
      username: '',
      password: '',
      email: '',
      phone: '',
      power: [],
      effect: true,
      receiveMail: false,
      superAdmin: false
    }
    this.setState({info: flag})
  }
  _sure = async() => {
    try {
      let {changeType, info} = this.state
      if (!await checkUser(info, changeType)) return
      if (!changeType) {
        addUser({user: info}).then((result) => {
          if (!result) return
          message.success('注册成功')
          this._hideModal()
          this._userList()
        })
      } else {
        updateUser({user: info}).then((result) => {
          if (!result) return
          message.success('更新成功')
          this._hideModal()
          this._userList()
        })
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({changeType: false})
    }
  }
  render() {
    const {
      columns, data, 
      powerVisible, addUserVisible, 
      info, powerDfKeys, adminVisible, superAdmin} = this.state
    const options = [
      { label: '普通管理员', value: false },
      { label: '超级管理员', value: true }
    ]
    return (
      <div className="admin-box">
        <div className="add-user-box">
          <div className="add-user" onClick={this._openAddUser}>
            <Icon type='plus' />
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
        <Modal
          title="移除管理员"
          visible={adminVisible}
          onOk={this._delectAdmin}
          onCancel={this._hideModal}
          okText="确认"
          cancelText="取消"
        >
          确认移除管理员
        </Modal>
        <Modal
          title="权限"
          visible={powerVisible}
          onOk={this._hideModal}
          onCancel={this._hideModal}
          okText="确认"
          cancelText="取消"
        >
          <Power
            defaultCheckedKeys={powerDfKeys}
            checkable={superAdmin? false: null}
            disabled={true}
          />
        </Modal>
        <Modal
          title="管理员"
          visible={addUserVisible}
          onOk={this._sure}
          onCancel={this._hideModal}
          okText="确认"
          cancelText="取消"
        >
          <Input
            placeholder="username"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={info.username}
            onChange={this._onChangeUserName}
          />
          <Input
            placeholder="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={info.password}
            type="password"
            onChange={this._onChangePassword}
            style={{marginTop: '20px'}}
          />
          <Input
            placeholder="email"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={info.email}
            onChange={this._onChangeEmail}
            style={{marginTop: '20px'}}
          />
          <Input
            placeholder="phone"
            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={info.phone}
            onChange={this._onChangePhone}
            style={{marginTop: '20px'}}
          />
          <div className="power-com-box">
            <div>有效</div>
            <Switch 
              checkedChildren={<Icon type="check" />} 
              unCheckedChildren={<Icon type="close" />}
              onChange={this._checkIsEffect}
              defaultChecked={info.effect}
              checked={info.effect}
            />
          </div>
          <div className="power-com-box">
            <div>接收系统邮件</div>
            <Switch 
              checkedChildren={<Icon type="check" />} 
              unCheckedChildren={<Icon type="close" />}
              onChange={this._checkIsMail}
              defaultChecked={info.receiveMail}
              checked={info.receiveMail}
            />
          </div>
          <div className="power-com-box">
            <div>管理员等级</div>
            <div>
              <RadioGroup options={options} onChange={this._selectGread} value={info.superAdmin}/>
            </div>
          </div>
          <div className="power-select-box" style={info.superAdmin? {display: 'none'}: {}}>
            <div>权限</div>
            <div>
              <Power
                defaultCheckedKeys={info.power}
                disabled={false}
                _selectPower={this._selectPower}
              />
            </div>
          </div>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
