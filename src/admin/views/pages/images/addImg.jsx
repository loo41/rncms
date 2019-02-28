import React, {Component} from 'react'
import {ImageLabelList, imageUpload} from '@/api/image'
import {index} from '@/api/config'
import {baseURL} from '../../../config'
import {Input, Select, Icon, message, Upload } from 'antd'
const { Option } = Select
import '../less/images'

export default class addImg extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      label: '',
      type: 1,
      labelList: [],
      fileList: [],
      banner: ''
    }
  }
  componentWillMount () {
    this._getImageLabel()
  }
  _clear = () => {
    this.setState({
      title: '',
      type: 1,
      fileList: [],
      banner: ''
    })
  }
  _getImageLabel () {
    ImageLabelList().then(async(result) => {
      if (!result) return
      result = result.data
      let {label} = result
      this.setState({labelList: label, label: label[0]? label[0].label: ''})
    })
  }
  _getTitle = (e) => {
    this.setState({title: e.target.value})
  }
  _getLabel = (value) => {
    this.setState({label: value})
  }
  _getType = (value) => {
    this.setState({type: value})
  }
  _getTypeLabelOption = (data) => {
    let flag = []
    data.forEach((item, i) => {
      flag.push(<Option value={item.label} key={item.label + i}>{item.label}</Option>)
    })
    return flag
  }
  _handleChange = (info) => {
    const banner = baseURL + '/' +info.url
    this.setState({banner})
  }
  _ImageUpload = () => {
    const {title, label, type, banner} = this.state
    if (title === '' || label === '' || banner === '') {
      return message.warn('星号字段不能为空')
    }
    imageUpload({title, label, type, banner}).then((ressult) => {
      if (!ressult) return
      message.success('添加成功')
      this._clear()
    })
  }
  render () {
    const {title, label, labelList, type, fileList, banner } = this.state
    const uploadButton = (
      <div>
        <div className="ant-upload-text" style={banner? {display: 'none'}: {display: 'block'}}>Upload</div>
        <img alt="banner" src={banner} style={banner? {display: 'block', width: '100%'}: {display: 'none'}}/>
      </div>
    )
    return (
      <div className="addImg-box">
        <div className="upload-box">
          <div onClick={this._ImageUpload}><Icon type='upload' style={{fontSize: '24px'}}/></div>
        </div>
        <div className="row-box">
          <div>* 标题</div>
          <div><Input
            placeholder="标题"
            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={title}
            onChange={this._getTitle}
          /></div>
        </div>
        <div className="row-box">
          <div>* 类别</div>
          <div>
            <Select onChange={this._getType} value={type}>
              <Option value={1} key={'one'}>类别一</Option>
              <Option value={2} key={'two'}>类别二</Option>
              <Option value={3} key={'three'}>类别三</Option>
            </Select>
          </div>
        </div>
        <div className="row-box">
          <div>* 标签</div>
          <div>
            <Select onChange={this._getLabel} value={label}>
              {labelList.length > 0 ? this._getTypeLabelOption(labelList) : null}
            </Select>
          </div>
        </div>
        <div className="row-box">
          <div>* 主图</div>
          <div>
            <Upload
              action={baseURL + index.upload.api}
              listType="picture-card"
              name="article"
              fileList={fileList}
              onSuccess={this._handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
        </div>
      </div>
    )
  }
}