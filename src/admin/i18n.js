import React, {Component} from 'react'
import { Provider } from 'react-redux'
import App from './views/App'
import {connect} from 'react-redux'
import {IntlProvider, addLocaleData} from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import locale from './locale'

addLocaleData([...en, ...zh])

class I18n extends Component {
  render () {
    const {currLocale, store} = this.props
    return (
      <IntlProvider locale={currLocale} messages={locale[currLocale]}>
        <Provider store={store}>
          <App store={store}/>
        </Provider>
      </IntlProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    currLocale: state.i18n.currLocale,
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(I18n)