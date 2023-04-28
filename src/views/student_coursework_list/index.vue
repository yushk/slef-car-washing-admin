<template>
  <div class="index-container">

    <Table :table-key="tableKey" :table-data="tableData" :current-page="currentPage" :page-size="pageSize" :total="total" @changePage="changePage">
      <template #search>
        课程标题：&nbsp;
        <el-input
          v-model="search.course_title"
          size="small"
          placeholder="输入关键字搜索"
          class="searchinput"
          clearable
        />
        <span>
          &nbsp;&nbsp;作业完成状态：&nbsp;
        </span>
        <el-select v-model="search.type" size="small" placeholder="请选择作业状态">
          <el-option label="全部" value="" />
          <el-option label="未完成" :value="0" />
          <el-option label="完成" :value="1" />
        </el-select>
        <el-button type="primary" size="small" @click="query">搜索</el-button>
      </template>
      <template #operate>

        <el-table-column
          label="操作"
          fixed="right"
          :width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="join(scope.row)"
            >查看课程</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit( scope.row)"
            >上传作业</el-button>
          </template>
        </el-table-column>

      </template>
    </Table>
    <el-drawer
      title="作业信息"
      :visible.sync="dialogVisible"
      size="80%"
      :before-close="handleClose"
    >
      <div style="overflow:auto;height:calc(100vh - 150px)">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
          <el-form-item label="作业视频" prop="content">
            <UploadImage :limit="9" :img-list="ruleForm.content" tips="添加作业视频" tips-flag @onSuccessFiles="onSuccessImgFiles" />
          </el-form-item>
          <el-form-item label="是否完成" prop="desc">
            <el-select v-model="ruleForm.desc" placeholder="是否完成作业">
              <el-option label="完成" value="1" />
              <el-option label="未完成" value="2" />
            </el-select>
          </el-form-item>
          <div class="u-flex u-flex-end">
            <el-popconfirm
              title="确认直接关闭么？"
              @onConfirm="dialogVisible = false"
            >
              <el-button slot="reference" type="info">关闭</el-button>
            </el-popconfirm>
            <el-button type="success" class="ml-2" :disabled="ruleForm.type===1" @click="submitForm('ruleForm')">保存</el-button>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { GetSolutions, UpdateSolution } from '@/api/apis'
import { parseTime } from '@/utils/index'
import { OSSClient } from '@/utils/oss'
import UploadImage from '@/components/uploadCom/index.vue'
import { upload } from '@/utils/oss.js'
import Table from '@/components/Table'
export default {
  name: 'User',
  components: {
    UploadImage, Table },
  data() {
    return {
      oss: null,
      tableData: [],
      tableKey: [
        { label: '课程名称', key: 'title' },
        // { label: '描述', key: 'desc' },
        { label: '作业', key: 'videos', type: 'link' },
        { label: '完成情况', key: 'typeLabel', type: 'tag' },
        { label: '评分', key: 'score', width: 100 },
        { label: '更新时间', key: 'commit_time', parse: 1, type: 'time', Func: parseTime, width: 150 }
      ],
      search: {
        course_title: '',
        type: ''
      },
      dialogVisible: false,
      ruleForm: {
        title: '',
        work_id: '',
        student_id: '',
        student_name: '',
        content: [],
        commit_time: 0,
        desc: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入课程标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入课程内容', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      editor: null,
      toolbarConfig: { },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            customUpload: async(file, insertFn) => {
              this.uploadMedia(file, insertFn, 'img')
            }
          },
          uploadVideo: {
            customUpload: async(file, insertFn) => {
              this.uploadMedia(file, insertFn, 'img')
            }
          }
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  mounted() {
    this.query()
    this.initoss()
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    changePage(v) {
      this.currentPage = v
      this.query()
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    query() {
      const q = Object.assign({ student_id: this.$store.state.user.userid }, this.search)
      Object.keys(q).forEach(e => {
        if (q[e] === '' || q[e] === undefined || q[e] === null) {
          delete q[e]
        }
      })
      var obj = {
        skip: this.pageSize * (this.currentPage - 1),
        limit: this.pageSize,
        query: JSON.stringify(q)
      }
      GetSolutions(obj).then(res => {
        const { items, total_count } = res
        this.tableData = items.map(e => {
          return {
            ...e,
            videos: JSON.parse(e.content || '[]'),
            typeLabel: [
              {
                type: e.desc === '1' ? 'success' : 'warning',
                name: e.desc === '1' ? '完成' : '未完成'
              }
            ]
          }
        })
        this.total = total_count
      })
    },
    handleEdit(row) {
      if (row.content) {
        row.content = JSON.parse(row.content) || []
      } else {
        row.content = []
      }
      this.type = 'edit'
      this.ruleForm = Object.assign({ }, row)

      this.dialogVisible = true
      console.log('this.ruleForm', this.ruleForm)
    },
    publish(row) {
      const obj = Object.assign({}, row)
      delete obj.id
      obj.type = 1
      this.$confirm('提交后不可修改，确认提交？')
        .then(_ => {
          UpdateSolution({ id: row.id, body: obj }).then(
            res => {
              this.$message.success('提交成功')
              this.query()
            }
          )
        })
        .catch(_ => {})
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm(formName) {
      const obj = Object.assign({}, this.ruleForm)
      delete obj.id
      obj.content = JSON.stringify(obj.content)
      obj.commit_time = new Date().getTime()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          UpdateSolution({ id: this.ruleForm.id, body: obj }, this.ruleForm).then(
            res => {
              this.$message.success('提交成功')
              this.query()
              this.dialogVisible = false
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    initoss() {
      this.oss = OSSClient()
    },
    // 监听图片上传
    onSuccessImgFiles(files) {
      console.log('onSuccessImgFiles', files)

      this.ruleForm.content = files.map((e, i) => {
        return {
          ...e,
          name: '运动视频_' + (i + 1)
        }
      })
    },
    uploadMedia(file, insertFn, type) { // JS 语法
      const loading = this.$loading({
        lock: true,
        text: '资源上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // insertFn(url, alt, href)
      const dir = `userid`
      const req = {
        file: file,
        dir,
        successCallback: res => {
          console.log('upload', res)
          const url = res.response ? res.response.url : res.url
          if (type === 'img') {
            insertFn(url, '图片失效', 'href')
          } else {
            insertFn(url, 'poster')
          }
          loading.close()
        },
        errCallBack: err => {
          console.log(err)
          loading.close()
        }
      }
      upload(req)
    },
    join(row) {
      const routeData = this.$router.resolve({
        path: `/article/${row.work_id}/${row.id}`
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container{
  .top{
    display: flex;
    justify-content: flex-start;
  }
}
</style>
