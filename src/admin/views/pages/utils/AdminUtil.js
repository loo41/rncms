import { message } from 'antd'

export const checkUser = (user, type) => {
  let regMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  let rePhone = /^1\d{10}$/
  console.log(type)
  const {username, password, email, phone, power, effect, receiveMail, grade} = user
  if (username === '' || (password === '' && !type) || email === '' || phone === '') {
    message.warning('不能为空')
    return false
  } else if (password !== '' && password.length < 6) {
    message.warning('密码不能少于6位')
    return false
  } else if (!regMail.test(email)) {
    message.warning('邮箱错误')
    return false
  } else if (!rePhone.test(phone)) {
    message.warning('电话错误')
    return false
  }
  return true
}

export const checkUserInfo = (user) => {
  let regMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  let rePhone = /^1\d{10}$/
  const {password, email, phone} = user
  if (password !== '' && password.length < 6) {
    message.warning('密码不能少于6位')
    return false
  } else if (!regMail.test(email)) {
    message.warning('邮箱错误')
    return false
  } else if (!rePhone.test(phone)) {
    message.warning('电话错误')
    return false
  }
  return true
}