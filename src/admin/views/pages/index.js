import Loadable from "react-loadable"
import Loading from './Loading'

import Index from './systemSet/HomeIndex'

const Log = Loadable({loader: () => import('./systemSet/Log'), loading: Loading})
const Backups = Loadable({loader: () => import('./systemSet/Backups'),loading: Loading})
const Admin = Loadable({loader: () => import('./systemSet/Admin'),loading: Loading})
const News = Loadable({loader: () => import('./systemSet/News'),loading: Loading})
const Power = Loadable({loader: () => import('./systemSet/Power'),loading: Loading})
const Article = Loadable({loader: () => import('./article/Article'),loading: Loading})
const AddArticle = Loadable({loader: () => import('./article/AddArticle'),loading: Loading})
const ArticleType = Loadable({loader: () => import('./article/ArticleType'),loading: Loading})
const UserManage = Loadable({loader: () => import('./user/UserManage'),loading: Loading})
const UserMes = Loadable({loader: () => import('./user/UserMes'),loading: Loading})
const Images = Loadable({loader: () => import('./images/index'),loading: Loading})
const AddImages = Loadable({loader: () => import('./images/addImg'),loading: Loading})
const ImagesType = Loadable({loader: () => import('./images/imgType'),loading: Loading})

export default {
  Index,
  Log,
  Backups,
  Power,
  Admin,
  News,
  Article,
  AddArticle,
  ArticleType,
  UserManage,
  UserMes,
  Images,
  AddImages,
  ImagesType
}