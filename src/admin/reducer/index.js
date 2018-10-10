import {combineReducers} from 'redux'

const auth = (state = {loginStatus: false}, action) => {
  switch (action.type) {
    case 'UP':
      return {loginStatus: action.state}
    default:
      return state
  }
}

const load = (state = {loadingState: false}, action) => {
  switch (action.type) {
    case 'UPLOADING':
      return {loadingState: action.state}
    default:
      return state
  }
}

const i18n = (state = {currLocale: 'zh'}, action) => {
  switch (action.type) {
    case 'I18N':
      return {currLocale: action.locale}
    default:
      return state
  }
}

const fristCome = (state = {fristGetInto: false}, action) => {
  switch (action.type) {
    case 'GETINTO':
      return {fristGetInto: action.state}
    default:
      return state
  }
}


export default combineReducers({
  auth,
  load,
  i18n,
  fristCome
})