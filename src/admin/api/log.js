import request from '@/utils/request.js'
import {log} from './config'

export function delLog (params) {
  return request({
    url: log.delLog.api,
    method: 'get',
    params
  })
}

export function logList (params) {
  return request({
    url: log.log.api,
    method: 'get',
    params
  })
}