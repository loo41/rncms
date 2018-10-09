import request from '@/utils/request.js'
import {article} from './config'

export function addArticleTypeLabel (data) {
  return request({
    url: article.addTypeLabel.api,
    method: 'post',
    data
  })
}

export function ArticleTypeList () {
  return request({
    url: article.articleTypeList.api,
    method: 'get'
  })
}

export function delectArticle (params) {
  return request({
    url: article.delectArticle.api,
    method: 'get',
    params
  })
}

export function addArticle (data) {
  return request({
    url: article.addArticle.api,
    method: 'post',
    data
  })
}

export function articleList(params) {
  return request({
    url: article.articleList.api,
    method: 'get',
    params
  })
}

export function updateType (data) {
  return request({
    url: article.updateType.api,
    method: 'post',
    data
  })
}

export function updateShow (data) {
  return request({
    url: article.updateShow.api,
    method: 'post',
    data
  })
}

export function getArticleContent (params) {
  return request({
    url: article.getArticleContent.api,
    method: 'get',
    params
  })
}

export function delArticle (params) {
  return request({
    url: article.delArticle.api,
    method: 'get',
    params
  })
}

export function getJson (params) {
  return request({
    url: article.getJson.api,
    method: 'get',
    params
  })
}

export function getSearchJson (params) {
  return request({
    url: article.getSearchJson.api,
    method: 'get',
    params
  })
}