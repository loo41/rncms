import axios from 'axios'
import Cookies from 'js-cookie'
import { message } from 'antd'
import {baseURL} from '../config'

const service = axios.create({
  baseURL: baseURL + '/manage',
  timeout: 15000
})

service.interceptors.request.use(config => {
  if (Cookies.get('token')) {
    config.headers['token'] = Cookies.get('token')
  }
  if (Cookies.get('key')) {
    config.headers['key'] = Cookies.get('key')
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      if (res.code === 1100) {
        message.error(res.mes)
        return false
      }
      if(res.mes) message.warning(res.mes)
      return false
    } else {
      return response
    }
  }, error => {
    return Promise.reject(error)
  }
)

export default service
