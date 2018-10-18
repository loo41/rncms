import request from '@/utils/request.js'
import {user} from './config'

export function delectUser ({_id}) {
  return request({
    url: user.delectUser.api + '/' + _id,
    method: 'delete'
  })
}

export function searchUser (params) {
  return request({
    url: user.searchUser.api,
    method: 'get',
    params
  })
}

export function userList ({page, limit}) {
  return request({
    url: user.userList.api + '/' + page,
    method: 'get',
    params: {limit}
  })
}

export function addUser (data) {
  return request({
    url: user.addUser.api,
    method: 'post',
    data
  })
}

