import request from '@/utils/request.js'
import {backup} from './config'


export function backupsList (params) {
  return request({
    url: backup.backupsList.api,
    method: 'get',
    params
  })
}

export function backups () {
  return request({
    url: backup.backups.api,
    method: 'get'
  })
}

export function delectFile (data) {
  return request({
    url: backup.delFile.api,
    method: 'post',
    data
  })
}
