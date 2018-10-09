import request from '@/utils/request.js'
import {news} from './config'

export function addNews (data) {
  return request({
    url: news.addNews.api,
    method: 'post',
    data
  })
}

export function getNewsList (params) {
  return request({
    url: news.getNewsList.api,
    method: 'get',
    params
  })
}

export function delNews (params)  {
  return request({
    url: news.delNews.api,
    method: 'get',
    params
  })
}