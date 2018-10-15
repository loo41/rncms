## rncms
---

### [开发文档](https://github.com/loo41/rncms/blob/dev/doc/README.md)

### 技术栈

```
webpack4 + koa2 + reactjs + antd

```
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
[后台](http://rncms-admin.tianchenyong.top)

```txt
    账号 youngon
    密码 youngon
```

[前台demo](http://rncms.tianchenyong.top/home)


```
前台基于模板渲染也可以用ajax，默认开发环境下允许跨域
```

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

+ 添加用户栏
