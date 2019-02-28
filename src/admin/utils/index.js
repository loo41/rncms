import routerConfig from '../views/router/config'

const getKey = (path) => {
  return new Promise((resolve) => {
    let router = routerConfig.menus
    let flag = []
    router.forEach(item => {
      if (item.component) {
        if (item.path === path) {
          flag.push(item.key)
        }
      } else {
        item.childrens.forEach((less) => {
          if (less.path === path) {
            flag.push(less.key)
          }
        })
      }
    })
    resolve(flag)
  })
}

export {
  getKey
}