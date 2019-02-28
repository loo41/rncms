import React, {Component} from 'react'
import './less/Article'
import E from 'wangeditor'
import {ArticleTypeList, addArticle} from '@/api/article'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {_loading} from '@/reducer/action'
import {Input, Select, Switch, Modal, Radio, Icon, message } from 'antd'
const { TextArea } = Input
const { Option } = Select
const RadioGroup = Radio.Group

class CreateArticle extends Component{
  constructor () {
    super()
    this.state = {
      article: {
        title: '',
        subTitle: '',
        summary: '',
        articleType: 1,
        type: '',
        label: '',
        keyword: [],
        show: true
      },
      label: [],
      type: [],
      editorContent: '',
      dataVisible: false,
      editor: {},
      update: false,
      flag: false,
      defaultShow: true
    }
  }
  _articleUpload = () => {
    let {article, editorContent, flag} = this.state
    const {title, subTitle, articleType, type, label} = article
    if (title === '' || subTitle === '' || articleType === '' || type === '' || label === '') {
      message.warn('星号字段不能为空')
      return
    }
    article.editorContent = editorContent
    let {loading} = this.props
    loading(true)
    addArticle({article}).then((ressult) => {
      loading(false)
      if (!ressult) return
      let {_close} = this.props
      if (!flag) {
        message.success('添加成功')
        this._clear()
      } else {
        message.success('更新成功')
        _close()
      }
    })
  }
  _clear = () => {
    let {editor, article} = this.state
    article.title = ''
    article.subTitle = ''
    article.summary = ''
    article.articleType = 1
    article.keyword = []
    this.setState({article})
    editor.txt.html('')
  }
  componentDidMount() {
    this._setEditor()
  }
  _setEditor = async () => {
    const elem = this.refs.editorElem
    const editor = new E(elem)
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    editor.customConfig.uploadImgServer = '/manage/upload'
    editor.customConfig.uploadFileName = 'article'
    editor.customConfig.withCredentials = true
    editor.customConfig.uploadImgHooks = {
      fail: function () {
        message.error('上传错误')
      },
      customInsert: function (insertImg, result) {
        let url = result.url
        insertImg(url)
      }
    }
    editor.create()
    let {update, editorContent} = this.state
    if (update) {
      editor.txt.html(editorContent)
    }
    await this.setState({editor})
  }
  _getLabelType = () => {
    let {loading} = this.props
    loading(true)
    ArticleTypeList().then(async(result) => {
      loading(false)
      if (!result) return
      result = result.data
      let {type, label} = result
      let {article} = this.state
      let types = type.map((item) => item.name)
      let labels = label.map((item) => item.name)
      article.type = types[0]
      article.label = labels[0]
      this.setState({type: types, label: labels, article})
    })
  }
  _getTitle = (e) => {
    let {article} = this.state
    article.title = e.target.value
    this.setState({article})
  }
  _getSubTitle = (e) => {
    let {article} = this.state
    article.subTitle = e.target.value
    this.setState({article})
  }
  _getSummary = (e) => {
    let {article} = this.state
    article.summary = e.target.value
    this.setState({article})
  }
  _getArticleType = (e) => {
    let {article} = this.state
    article.articleType = e.target.value
    this.setState({article})
  }
  _getType = (value) => {
    let {article} = this.state
    article.type = value
    this.setState({article})
  }
  _getLabel = (value) => {
    let {article} = this.state
    article.label = value
    this.setState({article})
  }
  _getShow = (checked) => {
    let {article} = this.state
    article.show = checked
    this.setState({article})
  }
  _openClear = () => {
    this.setState({dataVisible: true})
  }
  _suerClear = () => {
    this._clear()
  }
  _getTypeLabelOption = (data) => {
    let flag = []
    data.forEach((item, i) => {
      flag.push(<Option value={item} key={item + i}>{item}</Option>)
    })
    return flag
  }
  _getKeyword = (value) => {
    let {article} = this.state
    article.keyword = value
    this.setState({article})
  }
  componentWillMount () {
    this._cheUpdate()
    this._getLabelType()
  }
  componentWillReceiveProps(nextProps) {
    let {isCloseOpen} = nextProps
    if (isCloseOpen) {
      this._cheUpdate()
    }
  }
  _cheUpdate = async () => {
    let {articleInfo, update, content} = this.props
    let {defaultShow} = this.state
    if (articleInfo && update) {
      defaultShow = articleInfo.show
      await this.setState({article: articleInfo, editorContent: content, update, defaultShow})
      this._setEditor()
    }
  }
  _update = async () => {
    await this.setState({flag: true})
    await this._articleUpload()
  }
  render() {
    let { article, type, label, dataVisible, update, defaultShow} = this.state
    return (
      <div className="create-article-box">
        <div className="upload-box">
          {update? <div onClick={this._update}><Icon type="sync" spin /></div> :
            <div onClick={this._articleUpload}><Icon type='upload' style={{fontSize: '24px'}}/></div>
          }
          {update? null : <div onClick={this._openClear}><Icon type='delete' style={{fontSize: '24px'}}/></div>}
        </div>
        <Modal
          title="清空数据"
          visible={dataVisible}
          onOk={this._suerClear}
          okText="确认"
          cancelText="取消"
        >
          请确认清空所有数据
        </Modal>
        <div className="row-box">
          <div>* 标题</div>
          <div><Input
            placeholder="标题"
            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={article.title}
            onChange={this._getTitle}
          /></div>
        </div>
        <div className="row-box">
          <div>* 副标题</div>
          <div><Input
            placeholder="副标题"
            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={article.subTitle}
            onChange={this._getSubTitle}
          /></div>
        </div>
        <div className="row-box">
          <div>简介</div>
          <div><TextArea
            rows={4} 
            placeholder="简介"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={article.summary}
            onChange={this._getSummary}
          /></div>
        </div>
        <div className="row-box">
          <div>* 文档类型</div>
          <div>
            <RadioGroup style={{display: 'flex'}} 
              value={article.articleType} 
              onChange={this._getArticleType}>
              <Radio value={1}>普通</Radio>
              <Radio value={2}>星标</Radio>
            </RadioGroup>
          </div>
        </div>
        <div className="row-box">
          <div>* 类别</div>
          <div>
          <Select onChange={this._getType} value={article.type}>
            {type.length > 0 ? this._getTypeLabelOption(type) : null}
          </Select>
          </div>
        </div>
        <div className="row-box">
          <div>* 标签</div>
          <div>
            <Select onChange={this._getLabel} value={article.label}>
              {label.length > 0 ? this._getTypeLabelOption(label) : null}
            </Select>
          </div>
        </div>
        <div className="row-boxs">
          <div className="row-boxs-div1">关键字</div>
          <div className="row-boxs-div2">
            <Select
              mode="multiple"
              className="article-input"
              onChange={this._getKeyword}
              value={article.keyword}
            >
              {this._getTypeLabelOption(label.concat(type))}
            </Select>
          </div>
        </div>
        <div className="row-box">
          <div>展示</div>
          <div>
            <Switch defaultChecked={defaultShow} value={article.show} onChange={this._getShow}/>
          </div>
        </div>
        <div className="content-box">
          正文
        </div>
        <div>
          <div ref="editorElem" style={{textAlign: 'left'}}>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle)