import request from '@/utils/request.js'
import {index} from './config'


export function login (data) {
  return request({
    url: index.login.api,
    method: 'post',
    data
  })
}

export function checkPower () {
  return request({
    url: index.checkPower.api,
    method: 'get'
  })
}

export function homeData () {
  return request({
    url: index.home.api,
    method: 'get'
  })
}


export function baseData () {
  return request({
    url: index.baseData.api,
    method: 'get'
  })
}


