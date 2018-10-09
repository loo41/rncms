import React, {Component} from 'react'
import CreateArticle from '@/components/Article'

export default class AddArticle extends Component{
  render() {
    return (
      <div style={{padding: '15px'}}>
        <CreateArticle />
      </div>
    )
  }
}