import React, {Component} from 'react'
import {Table, Pagination} from 'antd'
import {getMessage} from '@/api/user'

export default class UserMes extends Component {
  constructor () {
    super()
    this.state = {
      messageList: [],
      total: 0,
      page: 1
    }
  }
  componentWillMount () {
    this._getMessageList()
  }
  _getMessageList = () => {
    let {page} = this.state
    getMessage({page}).then((result) => {
      if (!result) return
      result = result.data
      const {list, total} = result
      this.setState({messageList: list, total})
    })
  }
  _changePage = async(page) => {
    await this.setState({page: page})
    this._getMessageList()
  }
  render () {
    const {messageList, total} = this.state
    const columns = [
      {title: '联系人', dataIndex: 'user', key: 'user', render: (text) => (<span>{text.username}</span>)},
      {title: '电话', dataIndex: 'issue', key: 'issue'},
      {title: '留言内容', dataIndex: 'replyContent', key: 'replyContent'},
    ]
    return (
      <div style={{padding: '20px'}}>
        <Table columns={columns} dataSource={messageList} pagination={false} locale={{emptyText: '消息为空'}}/>
        <Pagination 
          defaultCurrent={1} 
          pageSize={20} 
          total={total}
          style={{marginTop: '20px'}}
          onChange={this._changePage}
        />
      </div>
    )
  }
}