import request from '@/utils/request.js'
import {user} from './config'


export function addUser (data) {
  return request({
    url: user.addUser.api,
    method: 'post',
    data
  })
}

export function userList () {
  return request({
    url: user.userList.api,
    method: 'get'
  })
}

export function delectAdmin (params) {
  return request({
    url: user.delAdmin.api,
    method: 'get',
    params
  })
}

export function updateUser (data) {
  return request({
    url: user.upAdmin.api,
    method: 'post',
    data
  })
}