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
const ArticleApi = Loadable({loader: () => import('./article/ArticleApi'),loading: Loading})
const UserManage = Loadable({loader: () => import('./user/UserManage'),loading: Loading})
const UserMessage = Loadable({loader: () => import('./user/UserMessage'),loading: Loading})
const UserApi = Loadable({loader: () => import('./user/UserApi'),loading: Loading})

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
  ArticleApi,
  UserManage,
  UserMessage,
  UserApi
}