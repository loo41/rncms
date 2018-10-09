import React, {Component} from 'react'
import {Divider, InputNumber, Switch, Icon, Select, Button} from 'antd'
import {ArticleTypeList, getJson, getSearchJson} from '@/api/article'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {_loading} from '@/reducer/action'
import ReactJson from 'react-json-view'
import '../less/ArticleApi'

class ArticleApi extends Component {
  constructor () {
    super ()
    this.state = {
      types: [],
      type: '',
      label: '',
      labels: [],
      limit: 0,
      star: 1,
      page: 0,
      content: false,
      url: '',
      searchUrl: '',
      data: {},
      keyword: '',
      searchData: {}
    }
  }
  _getTypeLabelOption = (data) => {
    let flag = []
    data.forEach((item, i) => {
      flag.push(<Option value={item} key={item + i}>{item}</Option>)
    })
    return flag
  }
  componentWillMount () {
    this._getLabelType()
    this._setUrl()
    this._setSearchUrl()
  }
  _setSearchUrl = () => {
    let {keyword} = this.state
    let flag = ''
    if (keyword) flag = `?keyword=${keyword}`
    this.setState({searchUrl: `/searchArticle${flag}`})
  }
  _setUrl = () => {
    let {type, limit, star, content, page} = this.state
    let del = false
    if (type === '' && limit === 0 && star === 1 && !content && page === 0) del = true 
    let flag = `/article${del? '' : '?'}
      ${page === 0? '' : `page=${page}${(type === '' && limit === 0 && star === 1 && !content)? '' : '&'}`}
      ${type === ''? '' : `type=${type}${(limit === 0 && star === 1 && !content)? '' : '&'}`}
      ${limit === 0? '' : `limit=${limit}${(star === 1 && !content)? '' : '&'}`}
      ${star === 1? '' : `star=${star}${(!content)? '' : '&'}`}
      ${!content? '' : `content=${content}`}`
    this.setState({url: flag})
  }
  _getLabelType = () => {
    let {loading} = this.props
    loading(true)
    ArticleTypeList().then(async(result) => {
      loading(false)
      if (!result) return
      result = result.data
      let {type, label} = result
      let types = type.map((item) => item.name)
      let labels = label.map((item) => item.name)
      this.setState({types, labels})
    })
  }
  _getJsonData = () => {
    let {type, limit, star, content, page} = this.state
    let {loading} = this.props
    loading(true)
    getJson({type, limit, star, content, page}).then((result) => {
      loading(false)
      if (!result) return
      this.setState({data: result.data})
    })
  }
  _getSearchJsonData = () => {
    let {keyword} = this.state
    let {loading} = this.props
    loading(true)
    getSearchJson({keyword}).then((result) => {
      loading(false)
      if (!result) return
      this.setState({searchData: result.data})
    })
  }
  _getType = async(value) => {
    await this.setState({type: value})
    this._setUrl()
  }
  _changeStar = async () => {
    let {star} = this.state
    star === 1? star = 2 : star = 1
    await this.setState({star})
    this._setUrl()
  }
  _getLimit = async (value) => {
    await this.setState({limit: value})
    this._setUrl()
  }
  _getPage = async (value) => {
    await this.setState({page: value})
    this._setUrl()
  }
  _getContent = async (state) => {
    await this.setState({content: state})
    this._setUrl()
  }
  _getKeyword = async (value) => {
    await this.setState({keyword: value})
    this._setSearchUrl()
  }
  render () {
    let {types, star, content, limit, url, labels, page, data, searchData, searchUrl} = this.state
    return (
      <div className="article-api-box">
        <div className="api-box">
          <div className="api-title">文章数据API</div>
          <Divider />
            <div className="send-box">
              <div>{url}</div>
                <Divider type="vertical" style={{height: '100%'}}/>
              <div>
                <Button type="primary" onClick={this._getJsonData}>
                  发送
                </Button>
              </div>
            </div>
          <Divider />
          <div className="api">
            <div className="api-arg-box">
              <div>限定翻篇页数</div>
              <div>page</div>
              <div>
                <InputNumber
                  min={0}
                  max={100}
                  value={page}
                  onChange={this._getPage}
                />
              </div>
            </div>
            <div className="api-arg-box">
              <div>限定条目数量</div>
              <div>limit</div>
              <div>
              <InputNumber
                min={0}
                max={100}
                value={limit}
                onChange={this._getLimit}
              />
              </div>
            </div>
            <div className="api-arg-box">
              <div>是否携带内容</div>
              <div>content</div>
              <div><Switch onChange={this._getContent} value={content}/></div>
            </div>
            <div className="api-arg-box">
              <div>指定为星标文章</div>
              <div>star</div>
              <div>
                {star === 1? <Icon type="star" onClick={this._changeStar}/> : <Icon type="star" style={{color: 'red'}} onClick={this._changeStar}/>}
              </div>
            </div>
            <div className="api-arg-box">
              <div>指定文章类别</div>
              <div>type</div>
              <div>
                <Select onChange={this._getType} style={{ width: '50%' }}>
                  <Option value={''} >任意类型</Option>
                  {types.length > 0 ? this._getTypeLabelOption(types) : null}
                </Select>
              </div>
            </div>
          </div>
          <Divider />
          <div className="api-json">
            <ReactJson src={data} collapsed={true}/>
          </div>
        </div>
        <div className="api-search">
          <div class="api-title">文章搜索API</div>
          <Divider />
            <div className="send-box">
              <div>{searchUrl}</div>
              <Divider type="vertical" style={{height: '100%'}}/>
              <div>
                <Button type="primary" onClick={this._getSearchJsonData}>
                  发送
                </Button>
              </div>
            </div>
          <Divider />
          <div className="api-search-box">
            <div>标签</div>
            <div>label</div>
            <div>
              <Select onChange={this._getKeyword} style={{ width: '50%' }}>
                <Option value={''} >无</Option>
                {this._getTypeLabelOption(labels.concat(types))}
              </Select>
            </div>
          </div>
          <Divider />
          <div className="api-json">
            <ReactJson src={searchData} collapsed={true}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleApi)