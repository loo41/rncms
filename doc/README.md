## rncms使用文档

---

### 基本使用

- git clone https://github.com/loo41/rncms.git

- cd 根目录

- npm install (不建议使用镜像 可能导致某些包下载失败)

- 全局环境下启动mongodb (保证全局环境下可执行)

- npm run dev (启动 服务器 后台 前端 开发环境 后端支持自动重启 后台支持热更新热加载 一些超级管理员配置config/mongodb下)

- npm run dev:server (如果不用开发后台建议启用这个 npm run dev服务自动重启时候会重新打包，过程较慢)

- npm run build (打包后台 一些链接 地址在config/setting 下可更改 )

- npm run server (启动服务 这个时候你的首先进行服务器配置， 下面我会给出nginx配置)


### 重要文件

```
project
|
|
|----- config
|        |
|        |----- setting (包含一下服务端和后端配置)
|        |
|        |----- mongodb (数据库配置和超级管理员配置)
|
|
|----- src
|       |
|       |------ admin
|       |         |
|       |         |--- api
|       |         |     |
|       |         |     | ----- config (按照样式写就ok, 记得新变量导出 其他文件引入)
|       |         |     |
|       |         |--- config (可看也可不看)
|       |         | 
|       |         |--- views
|       |         |      |
|       |         |      | ---- router(该文件夹config下是后台路由配置, 仿照即可, key不可以重复，
|       |         |      | 如果存在子导航不可以存在component，配置好后记得在pages下index下导入组件记得和配置同名)
|       |         |
|       |         |
|       |------ server
|       |         |
|       |         |--- router(路由配置)
|
|
|---- app.js(启动文件)


```

### 服务器nginx配置

#### server

```text

服务根目录下npm run server 即可 建议更改8080端口 （在app.js文件下），我服务器这样端口一直是被占用的

```


#### admin

```text

npm run build
将打包后的dist目录下的img 文件夹拷贝一份到后端文件静态目录(static)

server {
    listen 80;
    server_name 你后台地址;
    
    location / {
        root 你后台打包后文件位置;
        try_files $uri /index.html;
        index index.html;
    }

    location /manage {
        proxy_pass 你本地后端服务（http://127.0.0.1:3015）;
        proxy_set_header Host $host:$server_port;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    location ~* \.(gif|jpg|jpeg|png)$ {
        root 你后端文件的静态目录下(/home/rncms/server/static);
        expires 30d;
    }

}


```

#### client

我的是后台模板渲染的配置

```text


server {

    listen 80;
    server_name 你前端地址;
    
    location / {
        proxy_pass 你本地后端服务（http://127.0.0.1:3015）;
        proxy_set_header Host $host:$sserver_port;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}
```

### 提示

+ 有问题提issues


