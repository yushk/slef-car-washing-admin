import OSS from 'ali-oss'
import { GetSTSToken } from '@/api/apis'
// import sparkMD5 from 'spark-md5'

export var store = null
export var expiration_time = ''
export async function OSSClient() {
  if (store === null) {
    const { accessKeyId, accessKeySecret, stsToken, expiration } = await GetSTSToken()
    expiration_time = expiration
    // eslint-disable-next-line require-atomic-updates
    store = new OSS({
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
      accessKeyId,
      accessKeySecret,
      // 从STS服务获取的安全令牌（SecurityToken）。
      stsToken,
      // 填写Bucket名称。
      bucket: 'yourong-sport',
      // 填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
      region: 'oss-cn-hangzhou'
    })
  }
  return store
}

async function fileHash(file) {
  const chunks = []
  let cur = 0
  const size = 1 * 1024 * 1024
  var worker
  while (cur <= file.size) {
    chunks.push({ index: cur, file: file.slice(cur, cur + size) }) // 1MB切片
    cur += size
  }
  return new Promise(resolve => {
    worker = new Worker('./static/hash.js')// 开启一个外部进程
    worker.postMessage({ chunks }) // 给外部进程传递信息
    worker.onmessage = e => { // 接收外部Worker回传的信息
      const { progress, hash } = e.data
      console.log(Number(progress.toFixed(2))) // 计算hash值的进度条
      if (hash) {
        resolve(hash) // 得到计算出来的hash
      }
    }
  })
}

export async function upload({ file, dir, successCallback, errCallBack }) {
  try {
    const fileName = file.name
    const uuid = await fileHash(file)
    if (dir.substring(dir.length - 1, 1) !== '/') {
      dir += '/'
    }
    console.log(dir + uuid + fileName.substring(fileName.lastIndexOf('.')))
    const store = await OSSClient()
    store.put(dir + uuid + fileName.substring(fileName.lastIndexOf('.')), file).then(res => {
      console.log('upload success', res)
      let host = location.origin
      if (process.env.NODE_ENV === 'development') {
        host = 'https://www.yourong.tech'
      }
      res.url = host + '/' + res.name
      // const size = file.size > 1000000 ? parseFloat(file.size / 1000000).toFixed(2) + 'M' : parseFloat(file.size / 1000).toFixed(2) + 'KB'
      successCallback(res)
    },
    err => {
      console.error('upload error', err.response)
      errCallBack(err)
    })
      .catch(err => {
        console.error('upload error', err.response)
        errCallBack(err)
      })
  } catch (err) {
    errCallBack(err)
  }
}

