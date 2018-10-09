import React, {Component} from 'react'
import {Icon, Divider} from 'antd'
import {homeData} from '@/api'
import {getNewsList} from '@/api/news'
import Cookie from 'js-cookie'
import '../less/HomeIndex'
import userBg from '@/assets/img/user-bg.jpg'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {_loading} from '@/reducer/action'
import {admin} from '@/config'
import {Map, Marker} from 'react-bmap'

class Index extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      adminPeople: 0,
      message: 0,
      news: 0,
      messageContent: {},
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    }
  }
  componentWillMount () {
    this._getHomeData()
    this._setHomeData()
    this._getNewsList()
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
  render() {
    const {username, adminPeople, message, news, messageContent} = this.state
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
            <div className="show-data">
              <Map center={{lng: 117.124943, lat: 39.180983}} zoom="12" >
                <Marker position={{lng: 117.124943, lat: 39.180983}}/>
              </Map>
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
              <div className="github">
                <a href={admin.github} target="_Blank" ><Icon type="github" style={{fontSize: '30px'}}/></a>
              </div>
            </div>
          </div>
          <div className="home-data">
            <div className="notice">
              <p style={{letterSpacing: '1px', color: '#898FB1'}}>最近系统公告</p>
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