#说明


##1、启动yog2 
```
cd yog/
yog2 run
```


##2、启动ssp
```
cd ssp/
yog2 release debug -wld --fis3
```

##3.目录结构

###yo2目录

```
├─yog
    ├─app                 # server代码目录
    ├─conf                # 配置目录
    │  ├─plugins          # 插件配置  
    │  └─ral              # 后端服务配置 [配置端口]
    ├─log				  # yog日志
    ├─node_modules        # node依赖module
    ├─plugins             # 插件目录
    ├─static              # 静态资源目录
    ├─views               # 后端模板目录
    ├─.gitignore          # git忽略配置
    ├─.jshintrc           # js格式
    └─app.js              # project 启动入口
```

###ssp目录结构

```
├─client                 # 前端代码
│  ├─page                # 前端页面
│  ├─static              # 前端非模块化静态资源
│  │  ├─dep				 # 依赖组件
│  │  ├─js				 # 脚手架默认js
│  │  └─styles			 # css样式
│  └─widget              # 前端组件
│     ├─common    		 # 公用模块[footer sidenav]
│     ├─app.config.js    # 模块配置
│     ├─app.js			 # ssp启动入口文件
│     └─app.router.js	 # ssp路由文件
├─fis-conf.js            # FIS编译配置
└─server                 # 后端代码
    ├─action             # Action是指MVC中的路由动作，处理页面请求
    ├─lib                # 可以存放一些通用库
    ├─model              # 可以存放一些数据层代码，如后端API请求等
    ├─config.es          # 模块配置
    ├─interface.es       # 接口地址
    └─router.es          # AppRouter路由，用于处理自动路由无法满足的需求
```


###注意

启动app过程中可能会遇到一些模块依赖问题，可以用一下配置文件pack.json > devDependencies
```
{
  "name": "ssp",
  "version": "1.0.0",
  "description": "",
  "dependencies": {},
  "devDependencies": {
    "fis-optimizer-html-minifier": "0.0.9",
    "fis-parser-babel-5.x": "^1.3.0",
    "fis-parser-less": "^0.1.3",
    "fis-preprocessor-annotate": "0.0.2",
    "fis3-hook-commonjs": "^0.1.14",
    "fis3-hook-module": "^1.2.2",
    "fis3-packager-map": "^1.1.2",
    "fis3-postpackager-loader": "^1.3.15",
    "nm-deploy-http-push": "0.0.3"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```