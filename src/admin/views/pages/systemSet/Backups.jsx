import React, {Component} from 'react'
import {backupsList, backups, delectFile} from '@/api/backups'
import {checkPower} from '@/api'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {_loading} from '@/reducer/action'
import {Icon, Table, message, Pagination, Button, Modal} from 'antd'
import {baseURL} from '@/config'
import '../less/Backups'

class Backups extends Component {
  constructor () {
    super()
    this.state = {
      page: 1,
      list: [],
      notClick: false,
      backupsVisible: false,
      delectVisible: false,
      fileInfo: {},
      pagination: {
        pageSize: 10,
        total: 0
      }
    }
  }
  componentWillMount () {
    this._getbackupsList()
  }
  _getbackupsList = () => {
    let {page, list, pagination} = this.state
    let {loading} = this.props
    page = page || 1
    loading(true)
    backupsList({page}).then((result) => {
      loading(false)
      if (!result) return
      result = result.data
      list = result.data
      pagination.total = result.total
      this.setState({list, pagination})
    })
  }
  _openBackups = () => {
    this.setState({backupsVisible: true})
  }
  _opendelect = (text, record, index) => {
    let {fileInfo} = this.state
    fileInfo.index = index
    fileInfo = Object.assign(fileInfo, record)
    this.setState({delectVisible: true, fileInfo})
  }
  _delectFile = () => {
    const {fileInfo, list} = this.state
    let {loading} = this.props
    loading(true)
    delectFile(fileInfo).then((result) => {
      loading(false)
      if (!result) return
      message.success('删除成功')
      list.splice(fileInfo.index, 1)
      this._hideModal()
      this.setState({list})
    })
  }
  _hideModal = () => {
    this.setState({backupsVisible: false, delectVisible: false})
  }
  _backups = async() => {
    let {notClick} = this.state
    let {loading} = this.props
    if (notClick) return
    await this.setState({notClick: true})
    loading(true)
    backups().then((result) => {
      loading(false)
      if (!result) {
        this.setState({notClick: false})
        return
      }
      this.setState({notClick: false, backupsVisible: false})
      message.success('备份成功')
      this._getbackupsList()
    })
  }
  _changePage = async (page) => {
    await this.setState({page: page})
    this._getbackupsList()
  }
  _downFile = (text, record, index) => {
    checkPower().then((result) => {
      if (!result) return
      let aLess = document.createElement('a')
      aLess.href = baseURL + '/' + record.filename
      aLess.download = record.filename
      aLess.id = 'download'
      document.getElementById('download-box').appendChild(aLess)
      document.querySelector('#download').click()
      document.getElementById('download-box').removeChild(aLess)
    })
  }
  render() {
    const {list, pagination, backupsVisible, delectVisible} = this.state
    const columns = [
      {title: '文件名', dataIndex: 'filename', key: 'filename'},
      {title: '备份时间', dataIndex: 'date', key: 'date'},
      {title: '操作',  align: 'center', key: 'operation', render: (text, record, index) => (
        <div id="download-box">
          <Button type="primary" onClick={() => {this._downFile(text, record, index)}}>
            <Icon type="download" />下载
          </Button>
          <Button type="primary" type="danger" style={{marginLeft: '10px'}} onClick={() => {this._opendelect(text, record, index)}}>
            <Icon type="delete" />删除
          </Button>
        </div>
      )},
    ]
    return (
      <div className="backups-box">
        <div className="backups-operation-box">
          <div className="backups" onClick={this._openBackups}>
            备份<Icon type="sync" spin style={{marginLeft: '5px'}}/>
          </div>
        </div>
        <Modal
          title="备份"
          visible={backupsVisible}
          onOk={this._backups}
          onCancel={this._hideModal}
          okText="确认"
          cancelText="取消"
        >
          确认备份, 系统将会在每周末进行一次备份
        </Modal>
        <Modal
          title="备份"
          visible={delectVisible}
          onOk={this._delectFile}
          onCancel={this._hideModal}
          okText="确认"
          cancelText="取消"
        >
          确认删除, 系统会删除所有相关数据
        </Modal>
        <div>
          <Table 
            dataSource={list} 
            columns={columns}
            pagination={false}
          />
          <Pagination 
            defaultCurrent={1} 
            pageSize={pagination.pageSize} 
            total={pagination.total}
            style={{marginTop: '20px'}}
            onChange={this._changePage}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Backups)