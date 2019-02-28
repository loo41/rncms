import request from '@/utils/request.js'
import {power} from './config'

export function powerList () {
  return request({
    url: power.powerList.api,
    method: 'get'
  })
}

export function setPower (data) {
  return request({
    url: power.setPower.api,
    method: 'put',
    data
  })
}