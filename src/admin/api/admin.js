import request from '@/utils/request.js'
import {admin} from './config'


export function addUser (data) {
  return request({
    url: admin.addUser.api,
    method: 'post',
    data
  })
}

export function userList () {
  return request({
    url: admin.userList.api,
    method: 'get'
  })
}

export function delectAdmin (params) {
  return request({
    url: admin.delAdmin.api,
    method: 'get',
    params
  })
}

export function updateUser (data) {
  return request({
    url: admin.upAdmin.api,
    method: 'post',
    data
  })
}