import React, {Component} from 'react'
import {Icon, Divider, Modal, Tooltip, Input, message} from 'antd'
import {ImageLabelList, delectImageLable, addImageTypeLabel} from '@/api/image'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {_loading} from '@/reducer/action'
import '../less/ArticleType'

class imgLabel extends Component {
  constructor () {
    super()
    this.state = {
      labelList: [],
      typeLabel: false,
      articleLabel: ''
    }
  }
  componentWillMount () {
    this._getImageLabelList()
  }
  _getImageLabelList = () => {
    let {loading} = this.props
    loading(true)
    ImageLabelList().then(async(result) => {
      loading(false)
      if (!result) return
      result = result.data
      let {label} = result
      this.setState({labelList: label})
    })
  }
  _openAddLabel = () => {this.setState({typeLabel: true})}
  _delType = (_id) => {
    delectImageLable({_id}).then((result) =>{
      if (!result) return
      message.success('删除成功')
      this._getImageLabelList()
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
    addImageTypeLabel({label: articleLabel}).then((result) => {
      loading(false)
      if (!result) return
      message.success('添加成功')
      this._clear()
      this._hideModal()
      this._getImageLabelList()
    })
  }
  _hideModal = () => {this.setState({typeLabel: false})}
  _getLabel = (e) => {
    this.setState({articleLabel: e.target.value})
  }
  _clear = () => {
    this.setState({
      articleLabel: ''
    })
  }
  render () {
    const {labelList, typeLabel, articleLabel } = this.state
    return (
      <div className="article-type-box">
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
                    {item.label}
                    <Icon type='close' className="del-type" onClick={() => {this._delType(item._id)}}/>
                  </Tooltip>
                </div>
              )
            })}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(imgLabel)