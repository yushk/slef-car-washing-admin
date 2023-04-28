<template>
  <div class="index-container">
    <Table :table-key="tableKey" :table-data="tableData" :current-page="currentPage" :page-size="pageSize" :total="total" @changePage="changePage">
      <template #search>

        <el-input
          v-model="search"
          size="small"
          placeholder="输入关键字搜索"
          class="searchinput"
          @keyup.enter="query"
        />
        <el-button type="primary" size="small" @click="query">搜索</el-button>
        <el-button type="success" size="small" @click="create">新建</el-button>
      </template>
      <template #operate>

        <el-table-column
          label="操作"
          width="150px"
        >
          <template slot-scope="scope">
            <el-button
              v-if="roles.includes('root')||scope.row.auth_user.includes($store.state.user.userid)"
              size="mini"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              v-if="roles.includes('root')"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </template>
    </Table>
    <el-drawer
      :title="type==='new'?'创建教案':'修改教案'"
      :visible.sync="dialogVisible"
      size="80%"
      style="overflow-y:auto"
      :before-close="handleClose"
    >
      <div style="overflow:auto;height:calc(100vh - 150px)">

        <el-form ref="ruleForm" :inline="true" size="mini" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">

          <el-form-item label="运动类别" prop="sport_type" style="width:30%">
            <el-select
              v-model="ruleForm.sport_type"
              placeholder="请输选择运动类别"
              style="width:300px"
            >
              <el-option
                v-for="item in sportTypeOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="教案标题" prop="lable" style="width:30%">
            <el-input v-model="ruleForm.lable" style="width:300px" />
          </el-form-item>
          <el-form-item label="版本" prop="version" style="width:30%">
            <el-input v-model="ruleForm.version" style="width:300px" />
          </el-form-item>
          <el-form-item label="教案文件" prop="files" style="width:30%">
            <!-- ,'.doc','.docx','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document' -->
            <UploadImage key="uploadFile" :limit-type="['.pdf']" :limit="9" :img-list="ruleForm.files" tips="点击添加教案文件（格式为pdf）" tips-flag @onSuccessFiles="onSuccessFiles" />
          </el-form-item>
          <el-form-item key="uploadVideo" label="教案视频" prop="videos" style="width:30%">
            <UploadImage :limit="9" :limit-type="['video/*']" :img-list="ruleForm.videos" tips="点击添加教案视频" tips-flag @onSuccessFiles="onSuccessVideo" />
          </el-form-item>
          <el-form-item label="责任人" prop="auth_user" style="width:30%">
            <el-select
              v-model="ruleForm.auth_user"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入姓名"
              :remote-method="remoteUser"
              :loading="loading.user"
              style="width:300px"
            >
              <el-option
                v-for="item in useroptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="授课老师" prop="teachers" style="width:40%;">
            <el-select
              v-model="ruleForm.teachers"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入姓名"
              :remote-method="remoteUser"
              :loading="loading.user"
              style="width:300px"
            >
              <el-option
                v-for="item in useroptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="评价准测" prop="Evaluates" style="width:100%;display: flex;">
            <table border="1" style="width:100%;position: relative;">
              <tr>
                <th class="border w80">{{ tablehead.name }}</th>
                <th class="border w80">{{ tablehead.excellent }}</th>
                <th class="border w80">{{ tablehead.good }}</th>
                <th class="border w80">{{ tablehead.pass }}</th>
                <th class="border w80">{{ tablehead.flunk }}</th>
              </tr>
              <tr v-for="(grade,index) in grade_table " :key="index+'sdf'">
                <td class="w80">
                  &nbsp;
                  <el-input v-model="grade.name" type="textarea" autosize placeholder="请填写" />
                </td>
                <td class="w80">
                  <el-input v-model="grade.excellent" type="textarea" autosize placeholder="请填写打分评价标准" />
                </td>
                <td class="w80">
                  <el-input v-model="grade.good" type="textarea" autosize placeholder="请填写打分评价标准" />
                </td>
                <td class="w80">
                  <el-input
                    v-model="grade.pass"
                    type="textarea"
                    autosize
                    placeholder="请填写打分评价标准"
                  />
                </td>
                <td class="w80">
                  <el-input v-model="grade.flunk" type="textarea" autosize placeholder="请填写打分评价标准" />
                </td>
                <td class="w80">
                  <el-button type="danger" @click="delGrade(index)"> 删除</el-button>
                </td>
              </tr>
            </table>
            <el-button type="primary" @click="gradeTableAdd">添加动作评价标准</el-button>

          </el-form-item>
          <el-form-item
            prop="content"
            label="说明"
            style="width:100%;display: flex;"
          >
            <el-input v-model="ruleForm.content" type="textarea" :rows="4" placeholder="请填写备注说明" />
            <!-- <div style="border: 1px solid #ccc;width:100%">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :default-config="toolbarConfig"
                :mode="mode"
              />
              <Editor
                v-model="ruleForm.content"
                style="height: 250px; overflow-y: hidden;"
                :default-config="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
              />
            </div> -->
          </el-form-item>

        </el-form>
      </div>
      <div class="u-flex u-flex-end">
        <el-popconfirm
          title="确认直接关闭么？"
          @onConfirm="dialogVisible = false"
        >
          <el-button slot="reference" type="info">关闭</el-button>
        </el-popconfirm>
        <span style="width:10px" />
        <el-button type="primary" @click="submitForm('ruleForm',2)">保存</el-button>
        <span style="width:10px" />
        <!-- <el-popconfirm
          title="发布后将不能再编辑，确认发布？"
          @onConfirm="submitForm('ruleForm',1)"
        >
          <el-button slot="reference" type="primary">发 布</el-button>
        </el-popconfirm> -->
        <span style="width:100px" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'

import { CreateSportItem, GetSportItems, GetSportItem, UpdateSportItem, DeleteSportItem, GetUsers, GetSportTypes } from '@/api/apis'

import Table from '@/components/Table'
import { parseTime } from '@/utils/index'
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import UploadImage from '@/components/uploadCom/index.vue'
import { OSSClient } from '@/utils/oss'
import { upload } from '@/utils/oss.js'
export default {
  name: 'User',
  components: {
    // Editor, Toolbar,
    UploadImage, Table },
  data() {
    const checkLength = (rule, value, callback) => {
      if (value && value.length) {
        callback()
      }
      callback(callback(new Error()))
    }
    return {
      tableKey: [
        { label: '名称', key: 'lable', width: 120 },
        { label: '运动类别', key: 'sport_type' },
        { label: '责任人', key: 'auth_user_tag', type: 'tag' },
        { label: '授课老师', key: 'teachers', type: 'tag' },
        { label: '视频', key: 'videos', type: 'link' },
        { label: '文件', key: 'files', type: 'link' },
        { label: '版本', key: 'version', width: 100 },
        { label: '更新时间', key: 'update_time', parse: 1, type: 'time', Func: parseTime, width: 150 }],
      tableData: [],
      search: '',
      dialogVisible: false,
      ruleForm: {
        label: '',
        videos: [],
        files: [],
        content: '',
        html: '',
        auth_user: [],
        teachers: [],
        type: 2,
        sport_type: '',
        version: '2022',
        Evaluates: []
      },
      rules: {
        lable: [
          { required: true, message: '请输入教案标题', trigger: 'blur' }
        ],
        sport_type: [
          { required: true, message: '请选择运动类别', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '版本不能为空', trigger: 'blur' }
        ],
        auth_user: [
          { required: true, message: '请选择责任人', trigger: 'blur' }
        ],
        teacher: [
          { required: true, message: '请选择运授课老师', trigger: 'blur' }
        ],
        grade_table: [
          { required: false, message: '请设置评价准则', trigger: 'blur' }
        ],
        videos: [
          { required: true, message: '请选上传教案视频', validator: checkLength, trigger: 'change' }
        ],
        files: [
          { required: true, message: '请上传教案文件', validator: checkLength, trigger: 'change' }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      type: 'new',
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
      useroptions: [],
      loading: {
        user: false,
        course: false
      },
      tablehead: {
        name: '动作',
        excellent: '优秀',
        good: '良好',
        pass: '及格',
        flunk: '不及格'
      },
      grade_table: [
        {
          name: '',
          excellent: '',
          good: '',
          pass: '',
          flunk: ''
        }
      ],
      sportTypeOptions: [],
      alluseroptions: [],
      mode: 'default' // or 'simple'
    }
  },
  async created() {
    await this.remoteUser('')
    await this.getSportType()
    this.query()
  },
  mounted() {
  },
  methods: {

    create() {
      this.clear()
      this.type = 'new'
      this.dialogVisible = true
    },
    clear() {
      this.ruleForm = {
        label: '',
        videos: [],
        content: '',
        html: '',
        auth_user: [],
        teachers: [],
        type: 2,
        sport_type: '',
        version: '2022',
        Evaluates: []
      }
    },
    changePage(v) {
      this.currentPage = v
      this.query()
    },
    // 获取运动类别
    async getSportType() {
      var obj = {
        skip: 0,
        limit: 0,
        query: ''
      }
      const { items } = await GetSportTypes(obj)
      this.sportTypeOptions = items
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    query() {
      var obj = {
        skip: this.pageSize * (this.currentPage - 1),
        limit: this.pageSize,
        query: JSON.stringify({ auth_user: { $in: [this.$store.state.user.userid] }})
      }
      // 管理员可以查看全部
      // if (this.roles.includes('root')) {
      // }
      obj.query = ''
      GetSportItems(obj).then(res => {
        const { items, total_count } = res
        this.tableData = items.map((e) => {
          return {
            ...e,
            auth_user_tag: e.auth_user.map((au) => {
              const user = this.alluseroptions.find((u) => (u.value === au))
              return {
                type: 'success',
                name: user.label || ''
              }
            }),
            teachers: e.teachers.map((au) => {
              const user = this.alluseroptions.find((u) => (u.value === au))
              return {
                type: 'success',
                name: user.label || ''
              }
            }),
            sport_type: this.sportTypeOptions.find((u) => (u.id === e.sport_type)).label,
            type: [
              {
                type: e.type === 1 ? 'success' : 'warning',
                name: this.getType(e.type)
              }
            ]

          }
        })
        this.total = total_count
      })
    },
    async remoteUser(query) {
      this.loading.user = true
      var obj = {
        skip: 0,
        limit: 0,
        query: JSON.stringify({ name: { '$regex': query }, '$or': [{ role: 'teacher' }] })
      }
      const { items } = await GetUsers(obj)
      this.useroptions = items.map((e) => ({ label: e.name, value: e.id }))
      if (query === '') {
        this.alluseroptions = this.useroptions
      }
      this.loading.user = false
    },
    handleEdit(row) {
      this.type = 'edit'
      GetSportItem({ id: row.id }).then(res => {
        this.ruleForm = Object.assign({ }, res)
        this.grade_table = res.Evaluates
        this.dialogVisible = true
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除该条数据？')
        .then(_ => {
          DeleteSportItem({ id: row.id }).then(
            res => {
              this.$message.success('删除成功')
              this.query()
            }
          )
        })
        .catch(_ => {})
    },
    publish(row) {
      const obj = Object.assign({}, row)
      delete obj.id
      obj.type = 1
      UpdateSportItem({ id: row.id, body: obj }).then(
        res => {
          this.$message.success('发布成功')
          this.query()
        }
      )
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm(formName, type) {
      const obj = Object.assign({}, this.ruleForm)
      delete obj.id
      obj.type = type
      obj.Evaluates = this.grade_table
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 'new') {
            CreateSportItem({ body: obj }).then(
              res => {
                this.$message.success(' 创建成功')
                this.query()
                this.dialogVisible = false
                this.resetForm('ruleForm')
              }
            )
          } else {
            UpdateSportItem({ id: this.ruleForm.id, body: obj }).then(
              res => {
                this.$message.success('更新成功')
                this.query()
                this.dialogVisible = false
                this.resetForm('ruleForm')
              }
            )
          }
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
    onSuccessFiles(files) {
      console.log('onSuccessImgFiles', files)
      this.ruleForm.files = files
      // this.ruleForm.files = files.map((e, i) => {
      //   return {
      //     ...e,
      //     name: '教案视频_' + (i + 1)
      //   }
      // })
    },
    // 监听图片上传
    onSuccessVideo(files) {
      console.log('onSuccessImgFiles', files)
      this.ruleForm.videos = files
      // this.ruleForm.videos = files.map((e, i) => {
      //   return {
      //     ...e,
      //     name: '教案视频_' + (i + 1)
      //   }
      // })
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
    gradeTableAdd() {
      this.grade_table.push({
        name: '',
        excellent: '',
        good: '',
        pass: '',
        flunk: ''
      })
    },
    delGrade(i) {
      this.grade_table.splice(i, 1)
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
  .demo-ruleForm{
    position: relative;
  }
  ::v-deep.el-form-item__content{
    flex:1;
  }
}
</style>
