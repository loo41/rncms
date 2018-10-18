import React, {Component} from 'react'
import {Button, Icon, Table, Pagination, message, Modal} from 'antd'
import {delLog, logList} from '@/api/log'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {_loading} from '@/reducer/action'

class Log extends Component {
  constructor () {
    super()
    this.state = {
      list: [],
      page: 1,
      total: 0,
      logViews: false,
      info: ''
    }
  }
  componentWillMount () {
    this._getLogList()
  }
  _getLogList = () => {
    let {page} = this.state
    let {loading} = this.props
    loading(true)
    logList({page}).then((result) => {
      loading(false)
      if (!result) return
      result = result.data
      this.setState({list: result.data, total: result.total})
    })
  }
  _lookLogs = ({record}) => {
    this.setState({info: record.logs, logViews: true})
  }
  _hideModal = () => {
    this.setState({logViews: false})
  }
  _changePage = async(page) => {
    await this.setState({page: page})
    this._getLogList()
  }
  _delectLogs = (_id) => {
    delLog({_id}).then((result) => {
      if (!result) return
      message.success('删除成功')
      this._getLogList()
    })
  }
  _getbutType (type) {
    if (type === 1) {
      return 'danger'
    } else if (type === 2) {
      return 'primary'
    } else if (type === 3) {
      return 'dashed'
    }
  }
  render() {
    let {list, total, logViews, info} = this.state
    let columns = ([
      {title: '记录', dataIndex: 'des', align: 'center', key: 'des'},
      {title: '时间', dataIndex: 'date', align: 'center', key: 'date'},
      {title: '操作', dataIndex: 'operation', align: 'center', key: 'operation', render: (text, record, index) => (
        <div>
          <Button type={this._getbutType(record.type)} onClick={() => {this._lookLogs({text, record, index})}}>
            <Icon type="eye" /> 查看
          </Button>
          <Button type="danger" style={{marginLeft: '10px'}} onClick={() => {this._delectLogs(record._id)}}>
            <Icon type="delete" /> 删除
          </Button>
        </div>
      )}
    ])
    return (
      <div style={{padding: '50px', paddingTop: '20px'}}>
        <Modal
          title="日志内容"
          visible={logViews}
          onOk={this._hideModal}
          onCancel={this._hideModal}
          okText="确认"
          cancelText="取消"
        >
          {info}
        </Modal>
        <Table columns={columns} dataSource={list} pagination={false}/>
        <Pagination 
          defaultCurrent={1} 
          pageSize={10} 
          total={total}
          style={{marginTop: '20px'}}
          onChange={this._changePage}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Log)