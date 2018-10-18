import React, {Component} from 'react'
import {Table, Button, Icon} from 'antd'

export default class UserMessage extends Component {
  constructor () {
    super()
    this.state = {
      messageList: []
    }
  }
  _delectMessage = () => {}
  _reply = () => {}
  render () {
    const {messageList} = this.state
    const columns = [
      {title: '用户', dataIndex: 'user', key: 'user', render: (text) => (<span>{text.username}</span>)},
      {title: '问题', dataIndex: 'issue', key: 'issue'},
      {title: '回复', dataIndex: 'replyContent', key: 'replyContent'},
      {title: '回复人', dataIndex: 'admin', key: 'admin', render: (text) => (<span>{text.username}</span>)},
      {title: '时间', dataIndex: 'date', key: 'date'},
      {title: '查看状态', dataIndex: 'viewState', key: 'viewState', render: (text) => {
          if (text) {
            return <span>已查看</span>
          } else {
            return <span>未查看</span>
          }
        }
      },
      {title: '操作', align: 'center', key: 'operation', render: (text, record, index) => (
        <div>
          {record.replyState? null: 
            <Button type="primary"  style={{marginLeft: '10px'}} onDoubleClick={() => {this._reply(record._id)}}>
              <Icon type="delete" />回复
            </Button>
          }
          <Button type="primary" type="danger" style={{marginLeft: '10px'}} onDoubleClick={() => {this._delectMessage(record._id)}}>
            <Icon type="delete" />删除
          </Button>
        </div>
      )}
    ]
    return (
      <div style={{padding: '20px'}}>
        <Table columns={columns} dataSource={messageList} pagination={false} locale={{emptyText: '消息为空'}}/>
      </div>
    )
  }
}