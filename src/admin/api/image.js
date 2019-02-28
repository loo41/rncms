import request from '@/utils/request.js'
import {images} from './config'

export function addImageTypeLabel (data) {
  return request({
    url: images.addImageTypeLabel.api,
    method: 'post',
    data
  })
}

export function ImageLabelList () {
  return request({
    url: images.ImageLabelList.api,
    method: 'get'
  })
}

export function delectImageLable ({_id}) {
  return request({
    url: images.delectImageLable.api + '/' + _id,
    method: 'delete'
  })
}

export function imageUpload (data) {
  return request({
    url: images.imageUpload.api,
    method: 'post',
    data
  })
}


export function imageList (params) {
  return request({
    url: images.imageList.api,
    method: 'get',
    params
  })
}

export function delImage ({_id}) {
  return request({
    url: images.delImage.api + '/' + _id,
    method: 'delete'
  })
}