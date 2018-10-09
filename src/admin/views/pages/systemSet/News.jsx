import React, {Component} from 'react'
import {Modal, Table, Pagination, Icon, Input, Divider, message, Button} from 'antd'
const { TextArea } = Input
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {_loading} from '@/reducer/action'
import '../less/News'
import {addNews, getNewsList, delNews} from '@/api/news'

class News extends Component {
  constructor () {
    super ()
    this.state = {
      total: 0,
      list: [],
      newsViews: false,
      openAddNews: false,
      title: '',
      content: '',
      page: 1
    }
  }
  componentWillMount () {
    this._getNewsList()
  }
  _changePage = async(page) => {
    await this.setState({page: page})
    this._getbackupsList()
  }
  _getNewsList = () => {
    let {page} = this.state
    let {loading} = this.props
    loading(true)
    getNewsList({page}).then((result) => {
      loading(false)
      if (!result) return
      result = result.data
      this.setState({list: result.data, total: result.total})
    })
  }
  _centerAdd = () => {
    let {title, content} = this.state
    if (title === '' || content === '') {
      message.warn('不能为空')
      return
    }
    addNews({title, content}).then((result) => {
      if (!result) return
      message.success('添加成功')
      this._hideModal()
      this._getNewsList()
      this._clear()
    })
  }
  _delectNews = async(_id) => {
    let {loading} = this.props
    loading(true)
    delNews({_id}).then((result) => {
      loading(false)
      if (!result) return
      message.success('删除成功')
      this._getNewsList()
    })
  }
  _clear = () => {
    this.setState({title: '', content: ''})
  }
  _hideModal = () => {
    this.setState({openAddNews: false, newsViews: false})
  }
  _openAdd = () => {
    this.setState({openAddNews: true})
  }
  _getTitle = (e) => {
    this.setState({title: e.target.value})
  }
  _getContent = (e) => {
    this.setState({content: e.target.value})
  }
  render() {
    const {total, list, newsViews, openAddNews, title, content} = this.state
    const columns = [
      {title: '标题', dataIndex: 'title', width: 200, key: 'title'},
      {title: '时间', dataIndex: 'date', width: 200, key: 'date'},
      {title: '内容', dataIndex: 'content', key: 'content'},
      {title: '操作', dataIndex: 'operation', width: 200, align: 'center', key: 'operation', render: (text, record, index) => (
        <div>
          <Button type="primary" type="danger" style={{marginLeft: '10px'}} onClick={() => {this._delectNews(record._id)}}>
            <Icon type="delete" />
          </Button>
        </div>
      )}
    ]
    return (
      <div style={{padding: '20px'}}>
        <Modal
          title="公告清除"
          visible={newsViews}
          onOk={this._hideModal}
          onCancel={this._hideModal}
          okText="确认"
          cancelText="取消"
        >
          确认删除公告
        </Modal>
        <Modal
          title="添加公告"
          visible={openAddNews}
          onOk={this._centerAdd}
          onCancel={this._hideModal}
          okText="确认"
          cancelText="取消"
        >
          <Input placeholder='title' value={title} onChange={this._getTitle}/>
          <Divider />
          <TextArea placeholder="内容" rows={4} value={content} onChange={this._getContent}/>
        </Modal>
        <Table columns={columns} dataSource={list} pagination={false}/>
        <Pagination 
          defaultCurrent={1} 
          pageSize={10} 
          total={total}
          style={{marginTop: '20px'}}
          onChange={this._changePage}
        />
        <div className="add-news-but" onClick={this._openAdd}>
          <Icon type='plus' />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(News)