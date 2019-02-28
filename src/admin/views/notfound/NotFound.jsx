import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class NotFound extends Component {
  render() {
    return (
      <div style={{
        display: 'flex', 
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        fontSize: '40px',
        letterSpacing: '2px',
        color: '#898FB1'
      }}>
        404 NOT FOUND
        <Link to="/home/index"><p style={{
          fontSize: '20px',
        }}>首页</p></Link>
      </div>
    )
  }
}