const cp = require('child_process')
const chalk = require('chalk');
const { resolve } = require('path')


module.exports = async function cdn() {
  const script = resolve(__dirname, '../lib/oss')
  const child = cp.fork(script, [])
  let invoked = false
  child.on('error', err => {
    if (invoked) return
    invoked = true
    console.log(err)
  })
  child.on('exit', code => {
    if (invoked) return
    invoked = true
    let err = code === 0 ? null : new Error('exit code' + code)
  })

  child.on('message', data => {
    const result = data.result
    const ossJson = data.ossJson
    const url = `http://${ossJson.ossconfig.bucket}.${ossJson.ossconfig.region}.aliyuncs.com/${ossJson.osspath}`
    console.log(chalk.green(`success update to ali oss url: ${url}`));
  })
}
