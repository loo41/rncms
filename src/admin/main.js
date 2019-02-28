import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import I18n from './i18n'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(<I18n store={store}/>, document.getElementById('root'))

module.hot.accept()