# ac-tools


## 介绍

是一款编写应用组件的开发工具 [应用组件](https://github.com/tinper-acs) 执行远程代码访问、基本组件开发构建、demo示例的生成等自动化工具。


## 安装

```bash
$ ynpm install ac-tools -g 或者 (npm install ac-tools -g )

$ mkdir app && cd app

$ ac-tools init
```
 
> 稍等片刻安装结束后，输入下面命令来确定是否安装成功：

```bash
$ ac-tools

  Usage :

  1. ac-tools init           Generate best application component project
  2. ac-tools h              Help
  3. ac-tools v              Version
  4. ac-tools sample         Producing example Engineering
  5. ac-tools md             README.md documents are translated into HTML to be published on git IO

```
OK,到此成功。


## 使用

1. 如何使用前端集成工具`ac-tools`来快速创建一个应用组件：

```bash
$ cd app

$ ac-tools init
```

Start development server.
```bash
$ npm run dev
```
After writing a good example.
```bash
$ ac-tools sample
```
After writing README.md documents.

```bash
$ ac-tools md
```

## api


项目根目录，使用以下命令完成对应功能。

>命令5会有一分钟的延时，请耐心等待。

| # | Scripts 脚本命令 | Description 功能描述 |
| --- | --- | --- |
| 1 | ac-tools -h | api 查询 |
| 2 | ac-tools -v | 版本查询 |
| 3 | ac-tools init | 下载模板项目|
| 4 | ac-tools sample | 编写demo时，需要生成示例代码 |
| 5 | ac-tools md | README.md文档转化成html发布到git io上 |

##其他

### ynpm[推荐使用]

公司内网通过使用`ynpm`,实现快速下载包，减少下载等待时间。详情请 [点击](https://github.com/iuap-design/ynpm-tool)

```bash

$ ynpm install ac-tools -g               # 安装 ac-tools 速度飞快在内网下
```
 