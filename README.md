# ac-tools


## 介绍

是一款组件库编写组件开发工具 [应用组件](https://github.com/tinper-acs) 执行远程代码访问、基本组件开发构建、demo示例的生成。


## 安装

```bash
$ npm install ac-tools -g或者ynpm install ac-tools -g 或cnpm install ac-tools -g 

$ mkdir app && cd app

$ ac-tools init
```
> ynpm 、cnpm 安装见最底下

稍等片刻安装结束后，输入下面命令来确定是否安装成功：

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

[初始化生成的模版文件对应的文档链接](https://github.com/tinper-acs/app-component-templ)

2. Start development server.
```bash
$ npm run dev
```
3. After writing a good example.
```bash
$ ac-tools sample
```
4. Build io demo page. 
```bash
$ npm run deploy
```
5. After writing README.md documents.And push to io page
```bash
$ ac-tools md
```

## api


项目根目录，使用以下命令完成对应功能。

>命令5会有一分钟的延时，请耐心等待。

| # | Scripts 脚本命令 | Description 功能描述 |
| --- | --- | --- |
| 1 | ac-tools h | api 查询 |
| 2 | ac-tools v | 版本查询 |
| 3 | ac-tools init | 下载模板项目|
| 4 | ac-tools sample | 编写demo时，需要生成示例代码 |
| 5 | ac-tools md | README.md文档转化成html发布到git io上 |

## 其他

### ynpm

公司内网通过使用`ynpm`,实现快速下载包，减少下载等待时间。详情请 [点击](https://github.com/iuap-design/ynpm-tool)

```bash
$ npm install ynpm-tool -g          # 安装内部NPM工具

$ ynpm install ac-tools -g               # 安装 ac-tools 速度飞快在内网下
```

### cnpm

你可以使用淘宝定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:
```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

$ cnpm install ac-tools -g
```

### cdn

| key | 对应含义 | 是否必填 |
| --- | --- | --- |
| accessKeyId | oss账号id | 是 |
| accessKeySecret | oss账号secret | 是 |
| bucket | oss初始化放置目录 | 是|
| region | cdn的地区 | 是 |
| pushDirName | 上传文件的目录(相对路径) | 否，默认选择dist文件夹 |
| osspath | 上传文件生成url中path路径 | 否，默认为空 |
| exclude | 上传文件的目录中不用上传的文件名称 | 否，默认为空 |



> 例如 在文件根目录下创建`oss.config.json`

```
{
  "ossconfig": {
    "accessKeyId": "L1a2b3c4b5d6e7f",
    "accessKeySecret": "WFsdFkkLslK8KNHsHHKKjjhh",
    "bucket": "iuap-tenat-market",
    "region": "oss-cn-beijing"
  },
  "pushDirName":"dist",
  "osspath":"yonyou-fed",
  "exclude":["index.html",'html/index.html']
}
```

运行ac-tools cdn 生成cdn路径为：http://iuap-tenat-market.oss-cn-beijing.aliyuncs.com/yonyou-fed