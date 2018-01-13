# ac-tools


## 介绍

是一款组件库编写应用组件开发工具 [开发应用组件](https://github.com/tinper-acs) 执行远程代码访问、基本组件开发构建、demo示例的生成。


## 安装

安装 [node.js](https://nodejs.org) 开发环境.(node > 6.x && npm > 2.x)。

> 基于国内开源的囧境，可以使用淘宝的CNPM或用友集团内网的ynpm

#### ynpm

公司内网通过使用`ynpm`,实现快速下载包，减少下载等待时间。详情请 [点击](https://github.com/iuap-design/ynpm-tool)

```bash
$ npm install ynpm-tool -g          # 安装内部NPM工具

$ ynpm install ac-tools -g               # 安装 ac-tools 速度飞快在内网下
```

#### cnpm

你可以使用淘宝定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:
```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

$ cnpm install ac-tools -g
```

#### npm

首先进行工具命令的安装，需要安装到全局环境上使用，后面项目开发中，`bee-tools`是可以依赖包形式NodeAPI开发使用。
```bash
$ npm install ac-tools -g
```
稍等片刻安装结束后，输入下面命令来确定是否安装成功：

```bash
$ ac-tools -v

  Version : 0.0.1

```
OK,到此成功。


## 使用

1. 如何使用前端集成工具`uba`来快速创建一个基本脚手架：

```bash
$ mkdir app && cd app

$ ac-tools init
```

Start development server.
```bash
$ npm run dev
```

## api


项目根目录，使用以下命令完成对应功能。

| # | Scripts 脚本命令 | Description 功能描述 |
| --- | --- | --- |
| 1 | ac-tools -h | api 查询 |
| 2 | ac-tools -v | 版本查询 |
| 3 | ac-tools init | 下载模板项目|
| 4 | ac-tools sample | 生成示例代码 |
