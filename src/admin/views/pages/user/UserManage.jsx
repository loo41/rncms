import React, {Component} from 'react'
import {delectUser, searchUser, userList} from '@/api/user'
import {Table, Button, Icon, Input, Pagination, message, Modal} from 'antd'
const Search = Input.Search


export default class UserManage extends Component {
  constructor () {
    super()
    this.state = {
      page: 1,
      userList: [],
      searchList: [],
      searchUserBox: false
    }
  }
  componentWillMount () {
    this._getUserList()
  }
  _delectUser = (_id) => {
    delectUser({_id}).then((result) => {
      if (!result) return
      message.success('删除成功')
      this._getUserList()
    })
  }
  _getUserList = () => {
    let {page} = this.state
    userList({page, limit: 10}).then((result) => {
      if (!result) return
      result = result.data
      const {list, total} = result
      this.setState({userList: list, total})
    })
  }
  _changePage = async(page) => {
    await this.setState({page: page})
    this._getUserList()
  }
  _search = (value) => {
    if (!value) return message.warn('不能为空')
    searchUser({username: value}).then((result) => {
      if (!result) return
      result = result.data
      let {userList} = this.state
      this.setState({searchList: userList, searchUserBox: true})
    })
  }
  _backSex = (sex) => {
    if (sex == 1) {
      return <span><Icon type="smile" theme="outlined" />  男 </span>
    } else if (sex == 2) {
      return  <span><Icon type="smile" theme="meh" />  女 </span>
    } else {
      return  <span><Icon type="smile" theme="frown" />  无 </span>
    }
  }
  _handleCancel = () => {
    this.setState({searchUserBox: false, searchList: []})
  }
  render () {
    const {userList, total, searchList, searchUserBox} = this.state
    const columns = [
      {title: '账号', dataIndex: 'username', key: 'username'},
      {title: '邮箱', dataIndex: 'email', key: 'email'},
      {title: '电话', dataIndex: 'phone', key: 'phone'},
      {title: '性别', dataIndex: 'sex', key: 'sex', render: (text) => (
        <div>
          {this._backSex(text)}
        </div>
      )},
      {title: '操作', align: 'center', key: 'operation', render: (text, record, index) => (
        <div>
          <Button type="primary" type="danger" style={{marginLeft: '10px'}} onDoubleClick={() => {this._delectUser(record._id)}}>
            <Icon type="delete" />删除
          </Button>
        </div>
      )}
    ]
    return (
      <div style={{padding: '20px'}}>
        <div style={{width: '300px', marginBottom: '20px'}}>
          <Search
            placeholder="输入搜索用户名"
            onChange={this._getSearchValue}
            onSearch={this._search}
            enterButton
          />
        </div>
        <Table columns={columns} dataSource={userList} pagination={false} locale={{emptyText: '用户为 O'}}/>
        <Pagination 
          defaultCurrent={1} 
          pageSize={10} 
          total={total}
          style={{marginTop: '20px'}}
          onChange={this._changePage}
        />
        <Modal title="搜索结果"
          width={800}
          visible={searchUserBox}
          onOk={this._handleCancel}
          onCancel={this._handleCancel}
        >
          <Table 
            columns={columns} 
            dataSource={searchList} 
            pagination={false} 
            locale={{emptyText: '没有找到用户'}}/>
        </Modal>
      </div>
    )
  }
}