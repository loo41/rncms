import React, {Component} from 'react'
import {Icon, Divider, Modal, Tooltip, Input, message} from 'antd'
import {addArticleTypeLabel, ArticleTypeList, delectArticle} from '@/api/article'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {_loading} from '@/reducer/action'
import '../less/ArticleType'

class ArticleType extends Component {
  constructor () {
    super()
    this.state = {
      typeList: [],
      labelList: [],
      typeVisible: false,
      typeLabel: false,
      articleType: '',
      articleLabel: ''
    }
  }
  componentWillMount () {
    this._getTypeLabelList()
  }
  _hideModal = () => {
    this.setState({typeVisible: false, typeLabel: false})
  }
  _openAddType = () => {
    this.setState({typeVisible: true})
  }
  _openAddLabel = () => {
    this.setState({typeLabel: true})
  }
  _suerAddType = () => {
    let {articleType} = this.state
    let {loading} = this.props
    if (articleType.length === 0) {
      message.warn('不能为空')
      return
    }
    loading(true)
    addArticleTypeLabel({type: 'type', name: articleType}).then((result) => {
      loading(false)
      if (!result) return
      message.success('添加成功')
      this._clear()
      this._hideModal()
      this._getTypeLabelList()
    })
  }
  _suerAddLabel = () => {
    let {articleLabel} = this.state
    let {loading} = this.props
    if (articleLabel.length === 0) {
      message.warn('不能为空')
      return
    }
    loading(true)
    addArticleTypeLabel({type: 'label', name: articleLabel}).then((result) => {
      loading(false)
      if (!result) return
      message.success('添加成功')
      this._clear()
      this._hideModal()
      this._getTypeLabelList()
    })
  }
  _clear = () => {
    this.setState({
      articleLabel: '',
      articleType: ''
    })
  }
  _getTypeLabelList = () => {
    let {loading} = this.props
    loading(true)
    ArticleTypeList().then(async(result) => {
      loading(false)
      if (!result) return
      result = result.data
      let {type, label} = result
      this.setState({typeList: type, labelList: label})
    })
  }
  _getType = (e) => {
    this.setState({articleType: e.target.value})
  }
  _getLabel = (e) => {
    this.setState({articleLabel: e.target.value})
  }
  _delType = (_id) => {
    delectArticle({_id}).then((result) =>{
      if (!result) return
      message.success('删除成功')
      this._getTypeLabelList()
    })
  }
  render() {
    const {typeList, labelList, typeVisible, typeLabel, articleType, articleLabel} = this.state
    return (
      <div className="article-type-box">
        <div className="article-type">
          <div className="add" onClick={this._openAddType}>
            <div><Icon type='plus' /></div>
          </div>
          <Divider />
          <div className="type-box">
            {typeList.map((item, i) => {
              return (
                <div key={i + 'type'}>
                  <Tooltip title={item.name}>
                    {item.name}
                    <Icon type='close' className="del-type" onClick={() => {this._delType(item._id)}}/>
                  </Tooltip>
                </div>
              )
            })}
          </div>
        </div>
        <div className="article-label">
          <div className="add" onClick={this._openAddLabel}>
            <div><Icon type='plus' /></div>
          </div>
          <Divider />
          <div className="label-box">
            {labelList.map((item, i) => {
              return (
                <div key={i + 'label'}>
                  <Tooltip title={item.name}>
                    {item.name}
                    <Icon type='close' className="del-type" onClick={() => {this._delType(item._id)}}/>
                  </Tooltip>
                </div>
              )
            })}
          </div>
        </div>
        <Modal
          title="添加类型"
          visible={typeVisible}
          onOk={this._suerAddType}
          onCancel={this._hideModal}
          okText="确认"
          cancelText="取消"
        >
           <Input
              placeholder="输入文章类型"
              prefix={<Icon type="share-alt" style={{ color: 'rgba(0,0,0,.25)' }} />}
              value={articleType}
              onChange={this._getType}
            />
        </Modal>
        <Modal
          title="添加标签"
          visible={typeLabel}
          onOk={this._suerAddLabel}
          onCancel={this._hideModal}
          okText="确认"
          cancelText="取消"
        >
          <Input
            placeholder="输入文章标签"
            prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={articleLabel}
            onChange={this._getLabel}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleType)