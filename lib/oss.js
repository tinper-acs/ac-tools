
const fs = require('fs');
const path = require('path');
const oss = require('ali-oss');


;(async () => {
  try {
    const rootdir = process.cwd()
    const ossStr = await fs.readFileSync(path.join(rootdir, 'oss.config.json'))
    let ossJson = JSON.parse(ossStr)
    const initOssJson = {
      "pushDirName":"dist",
      "osspath": "",
      "exclude": []
    }
    ossJson = Object.assign(initOssJson, ossJson)
    const root = path.resolve(rootdir, ossJson.pushDirName);
    const store = oss(ossJson.ossconfig)
    const files = [];
    //递归取出所有文件夹下所有文件的路径
    function readDirSync(p) {
      const pa = fs.readdirSync(p);
      pa.forEach((e) => {
        const cur_path = `${p}/${e}`;
        const info = fs.statSync(cur_path);
        const rela_path = cur_path.replace(`${root}/`,'')
        if (info.isDirectory()) {
          readDirSync(cur_path);
        } else if(!ossJson.exclude.includes(rela_path)){
          files.push(cur_path);
        }
      });
    }
    readDirSync(root);
    let result;
    //遍历文件
    for (let index = 0; index < files.length; index++) {
      const e = files[index];
      try{
        result = await store.put(e.replace(root, ossJson.osspath), e);
      } catch (err) {
        console.log(err)
      }
      //提交文件到oss，这里要注意，阿里云不需要创建新文件夹，只有有路径，没有文件夹会自动创建
    }
    process.send({result,ossJson})
    process.exit(0)
  } catch(e) {
    console.error(e)
    process.send(result)
    process.exit(0)
  }
  
})();
