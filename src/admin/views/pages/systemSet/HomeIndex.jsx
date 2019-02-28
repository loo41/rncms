import React, {Component} from 'react'
import {Icon, Divider, Avatar} from 'antd'
import {homeData, baseData} from '@/api'
import {getNewsList} from '@/api/news'
import {userList} from '@/api/user'
import Cookie from 'js-cookie'
import '../less/HomeIndex'
import userBg from '@/assets/img/user-bg.jpg'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {_loading} from '@/reducer/action'
import {admin} from '@/config'
import ReactEcharts from 'echarts-for-react'
import ComponentList from '@/views/pages'
import Routes from '../../router/config'

class Index extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      adminPeople: 0,
      message: 0,
      news: 0,
      colorList: ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'],
      option: {},
      messageContent: {},
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      },
      userList: []
    }
  }
  componentWillMount () {
    this._getHomeData()
    this._setHomeData()
    this._getNewsList()
    this._getUserList()
    this.getOption()
  }
  componentDidUpdate () {
    Object.keys(Routes).forEach(key => 
      Routes[key].forEach(item => {
      const route = (r) => {
        if (r.component === 'Index') return
        ComponentList[r.component].preload()
      }
      item.component? route(item) : item.childrens.map(r => route(r))
    }))
  }
  _getUserList = () => {
    userList({page: 1, limit: 4}).then((result) => {
      if (!result) return
      result = result.data
      const {list} = result
      this.setState({userList: list})
    })
  }
  _getNewsList = () => {
    let {loading} = this.props
    loading(true)
    getNewsList({page: 1, limit: 1}).then((result) => {
      loading(false)
      if (!result) return
      result = result.data
      this.setState({messageContent: result.data[0]})
    })
  }
  _getHomeData = async() => {
    let {loading} = this.props
    loading(true)
    homeData().then((result) => {
      loading(false)
      if (!result) return
      result = result.data
      const {admin, message, news} = result
      this.setState({adminPeople: admin, message, news})
    })
  }
  _setHomeData = async() => {
    let username = await Cookie.get('username')
    this.setState({username})
  }
  _getNewUser = async() => {}
  getOption = () => {
    baseData().then((result) => {
      if (!result) return
      result = result.data
      const {data} = result
      this.setState({option: {
        title: {
          text: '网站基本数据统计'
        },
        tooltip: {},
        legend: {
            data: ['数据']
        },
        xAxis: {
            data: ["管理员", "文档", "消息", "用户", "数据", "日志"]
        },
        yAxis: {},
        series: [{
          name: '数据',
          type: 'bar',
          data: [{
            value: data[0],
            itemStyle: {
              color: '#67C23A',
              barBorderRadius: [3, 3, 0, 0]
            }
          }, {
            value: data[1],
            itemStyle: {
              color: '#34BFA3',
              barBorderRadius: [3, 3, 0, 0]
            }
          }, {
            value: data[2],
            itemStyle: {
              color: '#36A3F7',
              barBorderRadius: [3, 3, 0, 0]
            }
          }, {
            value: data[3],
            itemStyle: {
              color: '#F4516C',
              barBorderRadius: [3, 3, 0, 0]
            }
          }, {
            value: data[4],
            itemStyle: {
              color: '#34BFA3',
              barBorderRadius: [3, 3, 0, 0]
            }
          }, {
            value: data[5],
            itemStyle: {
              color: '#67C23A',
              barBorderRadius: [3, 3, 0, 0]
            }
          }]
        }]
      }})
    })
  }
  render() {
    const {username, adminPeople, message, news, messageContent, userList, colorList, option} = this.state
    return (
      <div className="home-index-box">
        <div className="basic-data-box">
          <div className="basic-data">
            <div style={{marginRight: '10px', marginBottom: '10px'}} className="list-box-one">
              <div className="list-one">
                <Icon type="user" style={{fontSize: '40px', color: '#67C23A'}} className="list-one-icon"/>
              </div>
              <div>
                <p>管理员</p>
                <p>{adminPeople}</p>
              </div>
            </div>
            <div style={{marginLeft: '10px', marginBottom: '10px'}} className="list-box-two">
              <div className="list-two">
                <Icon type="message" style={{fontSize: '40px', color: '#F4516C'}} className="list-two-icon"/>
              </div>
              <div>
                <p>系统消息</p>
                <p>{message}</p>
              </div>
            </div>
            <div style={{marginRight: '10px', marginTop: '10px'}} className="list-box-three">
              <div className="list-three">
                <Icon type="file-text" style={{fontSize: '40px', color: '#36A3F7'}} className="list-three-icon"/>
              </div>
              <div>
                <p>文档数</p>
                <p>{news}</p>
              </div>
            </div>
            <div style={{marginLeft: '10px', marginTop: '10px'}} className="list-box-four">
              <div className="list-four">
                <a href={admin.clientUrl} target="_Blank" >
                  <Icon type="chrome" style={{fontSize: '40px', color: '#34BFA3'}} className="list-four-icon"/>
                </a>
              </div>
              <div>
                <p>网站地址</p>
                <p></p>
              </div>
            </div>
          </div>
          <div className="basic-other-data">
            <div className="show-data" style={{padding: '10px', boxSizing: 'border-box', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)'}}>
              <ReactEcharts
                option={option}
                lazyUpdate={true}
                style={{height: '110%'}}
              />
            </div>
          </div>
        </div>
        <div className="home-content-box">
          <div className="home-user">
            <div className="home-bg">
              <img src={userBg}  className="home-bg-img"/>
            </div>
            <div className="home-user-box">
              <div className="user-name">
                <Icon type="user" style={{fontSize: '30px'}}/>
                <div style={{marginLeft: '20px', fontSize: '20px'}}>{username}</div>
              </div>
            </div>
          </div>
          <div className="home-data">
            <div className="notice">
              <p style={{letterSpacing: '1px', color: '#898FB1'}}>最新用户</p>
              <Icon type="sync" onClick={this._getUserList}/>
            </div>
            <Divider />
            <div>
              {userList.map((item, i) => {
                return <div key={i + item.username} className="user-list-box">
                <div className="user-head">
                  <div className="user-head-img">
                    {item.head_thumb? 
                      <img src={item.head_thumb} style={{width: '100%', height: '100%'}}/>: 
                      <Avatar className="head-img" style={{backgroundColor: colorList[Math.floor(Math.random() * colorList.length)]}} >
                        <Icon type="user" theme="outlined" style={{fontSize: '25px'}}/>
                      </Avatar>}
                  </div>
                </div>
                <div className="user-list-name">{item.username}</div>
              </div>
              })}
            </div>
          </div>
          <div className="home-data" style={{marginLeft: '10px'}}>
            <div className="notice">
              <p style={{letterSpacing: '1px', color: '#898FB1'}}>系统公告</p>
              <Icon type="sync" onClick={this._getNewsList}/>
            </div>
            <Divider />
            <div style={{textIndent: '20px', letterSpacing: '2px'}}>{messageContent? messageContent.content: null}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index)