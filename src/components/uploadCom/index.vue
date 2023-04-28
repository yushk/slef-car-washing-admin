<template>
  <div class="text-msg-pic-upload">
    <el-upload
      ref="upload"
      :class="{ display: uploadDisabled }"
      list-type="fileList"
      action
      multiple
      :http-request="handleUpload"
      :auto-upload="autoUpload"
      :limit="limit"
      :file-list="tempFileList"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :on-preview="handlePictureCardPreview"
      :accept="limitType.join(',')"
    >
      <el-button v-loading="isLoading" size="small" :disabled="disabled" type="primary">点击上传</el-button>
      <div v-if="tipsFlag" slot="tip" class="el-upload__tip">{{ tips }}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { upload } from '@/utils/oss.js'
export default {
  name: 'UploadImageDemo',
  props: {
    width: {
      type: String,
      default: '240px'
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 3
    },
    limitType: {
      type: Array,
      default: () => ['*']
    },
    disabled: {
      type: Boolean,
      default: false
    },
    imgList: {
      type: Array,
      default: () => []
    },
    tipsFlag: {
      type: Boolean,
      default: false
    },
    tips: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 上传文件列表，el-upload使用，临时保存数据。
      tempFileList: this.imgList,
      uploadDisabled: false,
      dialogImageUrl: '',
      dialogVisible: false,
      isLoading: false
    }
  },
  computed: {
    upText() {
      return this.autoUpload ? '上传文件' : '选择文件'
    }
  },
  watch: {
    // 解决第二渲染接口， 图片还保留着原来的问题 JerryYi
    imgList: {
      immediate: true,
      handler(val) {
        this.tempFileList = val
      }
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    handlePictureCardPreview(file) {
      window.open(file.url)
    },
    beforeUpload(file) {
      // console.log('beforeUpload', file)
      // const types = this.limitType
      // const isImage = types.includes(file.type)
      // const isLt20M = file.size / 1024 / 1024 < 1

      // if (!isImage) {
      //   this.$message({
      //     message: types.length === 0 ? '上传图片只能是 PNG 格式!' : '上传图片只能是 JPG、PNG 格式!',
      //     type: 'warning'
      //   })
      //   return false
      // }
      // if (!isLt20M) {
      //   this.$message.error('上传图片大小不能超过 1MB!')
      //   return false
      // }
      // return isImage && isLt20M
      return true
    },
    // 自定义上传操作
    handleUpload(op) {
      this.isLoading = true
      const dir = `images`
      const req = {
        file: op.file,
        dir,
        successCallback: res => {
          op.onSuccess(res)
        },
        errCallBack: err => {
          op.onError(err)
        }
      }
      upload(req)
    },
    // 上传成功后触发
    handleSuccess(response, file, fileList) {
      this.filterFileFn(fileList)
    },
    handleError(response, file, fileList) {
      console.log('上传失败')
      this.isLoading = false
      this.$message.error('上传失败')
    },
    // 返回给接口要用的格式
    filterFileFn(fileList) {
      const filterArr = fileList
        .filter(item => !item.status || item.status !== 'ready') // 过滤未上传的文件
        .map(item => {
          const url = item.response ? item.response.url : item.url
          return {
            url: url, // item.url || item.response.url
            name: item.name
          }
        })
      this.isLoading = false
      this.$emit('onSuccessFiles', filterArr)
    },
    // 监听移除文件列表
    handleRemove(file, fileList) {
      if (file.status === 'success') {
        this.filterFileFn(fileList)
      }
    },
    handleExceed(files, fileList) {
      this.$message({ message: `当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`, type: 'warning' })
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-msg-pic-upload{
    width: 100%;

}
::v-deep .el-upload-list{
    max-height: 120px;
    overflow: auto;
}
.text-msg-pic-upload .el-upload--picture-card,
.text-msg-pic-upload .el-upload-list--picture-card .el-upload-list__item {
    width: 62px;
    height: 62px;
    line-height: 72px;
}
.display .el-upload--picture-card {
    display: none;
}
</style>

