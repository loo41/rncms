import React, {Component} from 'react'
import {Icon, Button, Table, Pagination, message } from 'antd'
import {imageList, delImage} from '@/api/image'

export default class imgManager extends Component {
  constructor () {
    super()
    this.state = {
      list: [],
      total: 0
    }
  }
  componentWillMount () {
    this._getImageList()
  }
  _getImageList = () => {
    let {page} = this.state
    page = page || 1
    imageList({page}).then((result) => {
      if (!result) return
      result = result.data
      this.setState({list: result.data, total: result.total})
    })
  }
  _changePage = async(page) => {
    await this.setState({page: page})
    this._getArticleList()
  }
  _delImage = (_id) => {
    delImage({_id}).then((result) =>{
      if (!result) return
      message.success('删除成功')
      this._getImageList()
    })
  }
  _type = (index) => {
    if (index == 1) {
      return '主图'
    } else if (index == 2) {
      return '产品'
    } else {
      return '生产基地'
    }
  }
  render () {
    const {list, total} = this.state
    const columns = ([
      {title: '标题',  width: 200, dataIndex: 'title', key: 'title'},
      {title: '类型', width: 200, dataIndex: 'type', key: 'type',  render: (text) => (
        <div>
          {this._type(text)}
        </div>
      )},
      {title: '类别', width: 200, dataIndex: 'label', key: 'label'},
      {title: '图片', dataIndex: 'banner', key: 'image', render: (text) => (
        <div>
          <img src={text} style={{height: '100px'}}/>
        </div>
      )},
      {title: '操作', align: 'center',  key: 'operation', render: (text, record, index) => (
        <div>
          <Button type="primary" type="danger" style={{marginLeft: '10px'}} onDoubleClick={() => {this._delImage(record._id)}}>
            <Icon type="delete" />
          </Button>
        </div>
      )}
    ])
    return (
      <div style={{padding: '50px', paddingTop: '20px'}}>
        <Table columns={columns} dataSource={list} pagination={false}/>
        <Pagination defaultCurrent={1} pageSize={10} total={total} style={{marginTop: '20px'}} onChange={this._changePage}/>
      </div>
    )
  }
}