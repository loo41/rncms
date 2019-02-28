## rncms
---

### [开发文档](https://github.com/loo41/rncms/blob/dev/doc/README.md)

### 技术栈

- Webpack
- Koa2
- Reactjs
- Antd

### 库

- [背景](https://github.com/loo41/vuc)
- [可视化](https://github.com/hustcc/echarts-for-react)

### 使用

```
git clone https://github.com/loo41/rncms.git

npm install

// 启动前后端开发
npm run dev

// 启动后端环境
npm run dev:server

// 打包编译
npm run build

// 服务器部署
npm run server
```

### 预览

|   🔥     |  账号           | 预览   |
| -------- | --------------- | ------ |
| 后台地址 | youngon/youngon | [👀](http://rncms-admin.tianchenyong.top) |
| 前端demo |                 | [👁️](http://rncms.tianchenyong.top/home) |
| 项目后台 | youngon/youngon | [👀](http://vod-admin.tianchenyong.top)|
| 项目地址 |                 | [👁](http://vod.tianchenyong.top )|
| new Cms | 开箱即用，适合快速开发图片文档类型的 Cms| [👁](https://github.com/loo41/rncms/tree/col-cms) |

### 目录

```
project
|
|
|---------build(打包配置)
|
|---------config(全局配置文件)
|
|---------middleware(抽离出的一些中间件和组件)
|
|---------src
|          |
|          |----admin(后台)
|          |
|          |---client（前端demo）
|          |
|          |---server
|
|--------static
|
|
|
|-------app.js(服务器文件)
|
|
|-------gulpfile.js(glup配置文件)
|
|
|------pm2.config
|
|-------

```

---

### 开发计划

+ 添加任务栏
+ 增加自动化部署
