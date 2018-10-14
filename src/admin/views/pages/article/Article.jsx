import React, {Component} from 'react'
import {articleList, updateType, getArticleContent, updateShow, delArticle} from '@/api/article'
import {Table, Button, Icon, Switch, Pagination, message, Modal } from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {_loading} from '@/reducer/action'
import CreateArticle from '@/components/Article'
import '../less/Article'

class Article extends Component {
  constructor () {
    super ()
    this.state = {
      page: 1,
      list: [],
      total: 0,
      articleInfo: {},
      openUpdate: false,
      content: '',
      isCloseOpen: false,
      openDelView: false,
      openHtmlLook: false,
      html: '',
      del: {
        _id: '',
        contentId: ''
      }
    }
  }
  componentWillMount () {
    this._getArticleList()
  }
  _getArticleList = () => {
    let {page} = this.state
    let {loading} = this.props
    page = page || 1
    loading(true)
    articleList({page}).then((result) => {
      loading(false)
      if (!result) return
      result = result.data
      this.setState({list: result.data, total: result.total})
    })
  }
  _changePage = async (page) => {
    await this.setState({page: page})
    this._getArticleList()
  }
  _updateType = (type, _id, index) => {
    let flagType = type === 1? 2: 1
    let {loading} = this.props
    loading(true)
    updateType({_id, articleType: flagType}).then((result) => {
      loading(false)
      if (!result) return
      message.success('设置成功')
      let {list} = this.state
      list[index].articleType = flagType
      this.setState({list})
    })
  }
  _openUpdate = (data) => {
    getArticleContent({_id: data.content}).then(async(result) => {
      if (!result) return
      result = result.data
      await this.setState({articleInfo: JSON.parse(JSON.stringify(data)), 
        content: result.content.content,  openUpdate: true})
      this.setState({isCloseOpen: true})
    })
  }
  _hideModal = () => {
    this.setState({openUpdate: false, isCloseOpen: false, openDelView: false, openHtmlLook: false})
  }
  _close = () => {
    this._hideModal()
    this._getArticleList()
  }
  _openDelArticle = (_id, contentId) => {
    let {del} = this.state
    del._id = _id
    del.contentId = contentId
    this.setState({del, openDelView: true})
  }
  _delectArticle = () => {
    let {del} = this.state
    const {_id, contentId} = del
    delArticle({_id, contentId}).then((result) => {
      if (!result) return
      this._hideModal()
      message.success('删除成功')
      this._getArticleList()
    })
  }
  _lookHtml = (_id) => {
    getArticleContent({_id}).then(async(result) => {
      if (!result) return
      result = result.data
      this.setState({htmlContent: result.content.content, openHtmlLook: true})
    })
  }
  _updateShow = (state, _id, index) => {
    updateShow({_id, show: state}).then((result) => {
      if (!result) {
        let {list} = this.state
        list[index].show = !state
        this.setState({list})
        return
      }
      message.success('设置成功')
      let {list} = this.state
      list[index].show = state
      this.setState({list})
    })
  }
  render() {
    const {list, total, openUpdate, articleInfo, content, isCloseOpen, openDelView, htmlContent, openHtmlLook} = this.state
    const columns = ([
      {title: '标题',  width: 150, dataIndex: 'title', key: 'title'},
      {title: '主图', width: 150, dataIndex: 'masterGraph', key: 'masterGraph', render: (text) => (
        <img src={text} style={{width: '100px'}}/>
      )},
      {title: '日期', width: 150, dataIndex: 'date', key: 'date'},
      {title: '类别', width: 150, dataIndex: 'type', key: 'type'},
      {title: '标签', width: 150, dataIndex: 'label', key: 'label'},
      {title: '类型', width: 150, dataIndex: 'articleType', key: 'articleType', render: (text, record, index) => (
        <div>{text === 1?<Icon type="star" onClick={() => {this._updateType(text, record._id, index)}}/> : <Icon type="star" style={{color: 'red'}} onClick={() => {this._updateType(text, record._id, index)}}/>}</div>
      )},
      {title: '发布', width: 150, dataIndex: 'show', key: 'show', render: (text, record, index) => (
        <Switch defaultChecked={text} value={text} onChange={(state) => {this._updateShow(state, record._id, index)}}/>
      )},
      {title: '操作', align: 'center',  key: 'operation', render: (text, record, index) => (
        <div>
          <Button type="primary" onClick={() => {this._openUpdate(record)}}>
            <Icon type="form" />
          </Button>
          <Button type="primary" style={{marginLeft: '10px'}} onClick={() => {this._lookHtml(record.content)}}>
            <Icon type="eye" />
          </Button>
          <Button type="primary" type="danger" style={{marginLeft: '10px'}} onClick={() => {this._openDelArticle(record._id, record.content)}}>
            <Icon type="delete" />
          </Button>
        </div>
      )}
    ])
    return (
      <div className="article-box">
      <Modal
        title="文档内容预览"
        visible={openHtmlLook}
        onCancel={this._hideModal}
        onOk={this._hideModal}
        okText="确认"
        cancelText="取消"
        width="80%"
      >
        <div dangerouslySetInnerHTML={{__html: htmlContent}}></div>
      </Modal>
      <Modal
        title="删除文章"
        visible={openDelView}
        onOk={this._delectArticle}
        onCancel={this._hideModal}
        okText="确认"
        cancelText="取消"
      >
        确认删除?
      </Modal>
      <Modal
        title="更新文档"
        visible={openUpdate}
        onCancel={this._hideModal}
        width="80%"
        maskClosable={false}
        >
          <CreateArticle
            articleInfo={articleInfo}
            update={true}
            content={content}
            isCloseOpen={isCloseOpen}
            _close={this._close}
          />
        </Modal>
      <Table columns={columns} dataSource={list} pagination={false}/>
      <Pagination defaultCurrent={1} pageSize={10} total={total} style={{marginTop: '20px'}} onChange={this._changePage}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Article)