<template>
  <div>
    <h1>xxx课程</h1>
    <div style="margin: 20px;">
      <label>节标题：</label>
      <input v-model="title" type="text" name="">
    </div>
    <div style="margin: 20px;">
      <label>节序号：</label>
      <input v-model="serial_num" type="text" name="" oninput="value=value.replace(/[^\d]/g,'')">
    </div>
    <div style="margin: 20px;">
      <label>课程时长：</label>
      <input v-model="time" type="text" name="" oninput="value=value.replace(/[^\d]/g,'')">
    </div>
    <div style="margin: 20px;">
      <label>序号：</label>
      <input v-model="seq" type="text" name="" oninput="value=value.replace(/[^\d]/g,'')">
    </div>

    <input id="upFile" type="file" name="upFile" @change="changeFile($event)">
    <input type="button" name="开始上传" value="开始上传" @click="uploadFile()">
    <img v-if="coverUrl" :src="coverUrl" alt="封面">
    <el-progress :percentage="filePercent" />
    <div>{{ filePercent }}</div>
    <button @click="add_section()">提交添加信息</button>
    <video
      :src="pay_video"
      width="640"
      height="480"
      controls="controls"
    />

  </div>
</template>
<script>
import * as qiniu from 'qiniu-js'
export default {
  name: 'Qiniu',
  data() {
    return {
      pay_video: '',
      file: null,
      coverUrl: null,
      filePercent: 0,
      token: 'Us0DTIDhqbmIxkZchV16ZwArmL2uoztZsR2a0eB7:wsFFNrxKOj5vP7Chy3Pfo-bVZYE=:eyJzY29wZSI6Inl4dHhoZWFsdGh5IiwiZGVhZGxpbmUiOjE2NjAzOTg0Njl9',
      title: '',
      seq: '',
      time: '',
      serial_num: '',
      baseurl: 'http://rgjwpv3hb.hb-bkt.clouddn.com/'
    }
  },
  mounted() {
  },
  methods: {
    changeFile(e) {
    //   获取文件
      this.file = e.target.files[0]
    },
    gettoken() {

    },
    uploadFile() {
      // 获取身份的token
      const token = 'Us0DTIDhqbmIxkZchV16ZwArmL2uoztZsR2a0eB7:EkMxYj1W3hZrxZT8HnqXCbW0vV4=:eyJzY29wZSI6Inl4dHhoZWFsdGh5IiwiZGVhZGxpbmUiOjE2NjA0MDM0ODl9'
      // 上传时的配置
      var config = {
        useCdnDomain: true
      }
      //  设置文件的配置
      var putExtra = {
        fname: 'yxtxhealthy',
        params: {},
        mimeType: null
      }

      //   实例化七牛云的上传实例
      var observable = qiniu.upload(this.file, null, token, putExtra, config)
      //   设置实例的监听对象
      var observer = {
        //   接收上传进度信息
        next: (res) => {
          // 上传进度
          this.filePercent = parseInt(res.total.percent)
          if (this.filePercent === 100) {
            // alert('上传成功')
          }
        },
        // 接收上传错误信息
        error: (err) => {
          console.log(err)
        },
        // 接收上传完成后的信息
        complete: (res) => {
          // 拼接路径字符串
          this.pay_video = this.baseurl + res.key
          console.log(this.videoUrl)
        }
      }
      // 上传开始
      observable.subscribe(observer)
    }

  }

}
</script>

<style>
  #index-container{
    width:200px;
    height:200px;
    border:1px solid #9d9d9d;
    border-radius: 6px;
    margin:50px auto;
    position: relative;
    overflow: hidden;
  }
  .upload-progress{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    background: rgba(0,0,0,0.5);
    z-index: 5;
    color:#fff;
    line-height: 200px;
    text-align: center;
    display: none;
  }
  #uploadImage{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    z-index: 2;
    text-align: center;
    line-height: 200px;
    cursor: pointer;
  }
  #index-container img{
    width:100%;
    position: absolute;
    top:0;
    left:0;
    z-index: 1;
  }
</style>

