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
          fixed="right"
          :width="200"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-popconfirm
              title="删除后不可找回，请确认是否删除？"
              @onConfirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" size="mini" class="ml-2" type="danger">删 除</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </template>

    </Table>
    <el-drawer
      :title="type==='new'?'创建课程':'修改课程'"
      :visible.sync="dialogVisible"
      size="80%"
    >
      <div style="overflow:auto;height:calc(100vh - 150px)">
        <div class="px-10 my-4">
          <el-steps :active="step">
            <el-step title="选择教案" />
            <el-step title="完善信息" />
            <el-step title="完成" />
          </el-steps>
        </div>

        <div v-if="step===0" class="px-10">
          <div class="flex flex-row items-center">
            <div class="mr-4 text-xl blod"> 选择运动类别:
            </div>
            <el-select
              v-model="sport_type"
              placeholder="请输选择运动类别"
              style="width:300px"
              @change="sportTypeChange"
            >
              <el-option
                v-for="item in sportTypeOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>

            <div class="mr-4 text-xl blod"> 选择教案:
            </div>
            <el-select
              v-model="ruleForm.sport_item_id"
              placeholder="请选择教案"
              style="width:300px"
              @change="showSportItem"
            >
              <el-option
                v-for="item in sportItemOptions"
                :key="item.id"
                :label="item.lable"
                :value="item.id"
              />
            </el-select>
          </div>
          <el-card class="mt-4">
            <SportItem :rule-form="sportItem" />
          </el-card>
        </div>

        <el-form v-if="step===1" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
          <el-form-item label="课程名称" prop="title">
            <el-input
              v-model="ruleForm.title"
              size="small"
              placeholder="请输入课程名称"
              class="searchinput"
            />
          </el-form-item>
          <el-form-item label="有效期">
            <el-date-picker
              v-model="vailedTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
            />
          </el-form-item>
          <el-form-item label="学生数量" prop="number">
            <el-input v-model="ruleForm.number" type="number" />
          </el-form-item>
          <el-form-item
            prop="desc"
            label="内容"
          >
            <div style="border: 1px solid #ccc;">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :default-config="toolbarConfig"
                :mode="mode"
              />
              <Editor
                v-model="ruleForm.desc"
                style="height: 400px; overflow-y: hidden;"
                :default-config="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
              />
            </div>
          </el-form-item>
        </el-form>
        <div v-if="step===2" class="flex justify-center h-64">
          发布成功
        </div>
        <div class="flex justify-center">
          <el-button v-if="step===1" style="margin-top: 12px;" type="primary" @click="next(-1)">上一步</el-button>
          <el-button v-if="step!==2" style="margin-top: 12px;" type="primary" @click="next(1)">下一步</el-button>
          <el-button v-if="step===2" style="margin-top: 12px;" type="success" @click="dialogVisible = false;step=0">关闭</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import Table from '@/components/Table'
import { CreateHomeWork, GetHomeWorks, GetUsers, UpdateHomeWork, DeleteHomeWork, GetSportItems, GetHomeWork, GetSportTypes } from '@/api/apis'
import { parseTime } from '@/utils/index'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { OSSClient } from '@/utils/oss'
import { upload } from '@/utils/oss.js'
import SportItem from './com/sport_item.vue'
export default {
  name: 'HomeWork',
  components: { Editor, Toolbar, SportItem, Table },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '未来一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '未来一个月',
          onClick(picker) {
            const start = new Date()
            const end = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '未来三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      step: 0,
      oss: null,
      tableData: [],
      tableKey: [
        { label: '课程', key: 'title' },
        { label: '教案', key: 'label', width: 300 },
        { label: '人数', key: 'number' },
        { label: '老师', key: 'teacher' },
        { label: '二维码', key: 'QR_code', type: 'qr' },
        { label: '开始时间', key: 'start_time', parse: 1, type: 'time', Func: parseTime, width: 150 },
        { label: '截至时间', key: 'end_time', parse: 1, type: 'time', Func: parseTime, width: 150 }
      ],
      search: '',
      dialogVisible: false,
      ruleForm: {
        sport_item_id: '',
        sport_item: {},
        start_time: 0,
        end_time: 0,
        QR_code: '',
        number: 0,
        desc: '',
        title: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入课程内容', trigger: 'blur' }
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
      sportItem: {},
      sportItemOptions: [],
      vailedTime: [],
      alluseroptions: [],
      sportTypeOptions: [],
      sport_type: '',
      mode: 'default' // or 'simple'

    }
  },
  async mounted() {
    await this.remoteUser('')
    this.query()
    this.initoss()
    this.getSportType()
    this.getSportItem()
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
    async remoteUser(query) {
      var obj = {
        skip: 0,
        limit: 0,
        query: JSON.stringify({ name: { '$regex': query }, '$or': [{ role: 'teacher' }, { role: 'root' }] })
      }
      const { items } = await GetUsers(obj)
      this.alluseroptions = items.map((e) => ({ label: e.name, value: e.id }))
    },
    clear() {
      this.step = 0
      this.ruleForm = {
        sport_item_id: '',
        sport_item: {},
        start_time: 0,
        end_time: 0,
        QR_code: '',
        number: 0,
        desc: ''
      }
      this.sportItem = {}
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
    sportTypeChange(e) {
      this.getSportItem(e)
    },
    showSportItem(e) {
      this.sportItem = Object.assign({}, this.sportItemOptions.find(u => (u.id === e)))
      delete this.sportItem.id
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    query() {
      var obj = {
        skip: this.pageSize * (this.currentPage - 1),
        limit: this.pageSize,
        query: JSON.stringify({ teacher: this.$store.state.user.userid })
      }
      // 管理员可以查看全部
      if (this.roles.includes('root')) {
        obj.query = ''
      }
      GetHomeWorks(obj).then(res => {
        const { items } = res
        this.tableData = items.map((e) => {
          return {
            ...e,
            QR_code: e.id,
            label: e.sport_item.lable,
            teacher: this.alluseroptions.find((u) => (u.value === e.teacher)).label
          }
        })
      })
    },
    // 获取教案列表
    getSportItem(q) {
      var obj = {
        skip: 0,
        limit: 0,
        query: JSON.stringify({ sport_type: { '$regex': q }, $or: [{ teachers: { $in: [this.$store.state.user.userid] }}, { auth_user: { $in: [this.$store.state.user.userid] }}] })
      }
      // 管理员可以查看全部
      if (this.roles.includes('root')) {
        obj.query = JSON.stringify({ sport_type: { '$regex': q }})
      }

      GetSportItems(obj).then(res => {
        const { items } = res
        this.sportItemOptions = items
      })
    },
    create() {
      this.dialogVisible = true
      this.type = 'new'
      this.clear()
    },
    handleEdit(row) {
      this.type = 'edit'
      this.clear()
      GetHomeWork({ id: row.id }).then(res => {
        this.ruleForm = Object.assign({ }, res)
        this.sportItem = res.sport_item
        this.vailedTime = [res.start_time * 1000, res.end_time * 1000]
        this.dialogVisible = true
      })
    },
    handleDelete(row) {
      DeleteHomeWork({ id: row.id }).then(
        res => {
          this.$message.success('删除成功')
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
      obj.start_time = Math.floor(this.vailedTime[0] / 1000) || 0
      obj.end_time = Math.floor(this.vailedTime[1] / 1000) || 0
      obj.teacher = this.$store.state.user.userid
      obj.number = Number(obj.number)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('this.type', this.type)
          if (this.type === 'new') {
            CreateHomeWork({ body: obj }).then(
              res => {
                this.query()
                this.resetForm('ruleForm')
              }
            )
          } else {
            delete obj.sport_item
            obj.solutions_info = obj.solutions_info.map((e) => {
              delete e.id
              return e
            })
            UpdateHomeWork({ id: this.ruleForm.id, body: obj }).then(
              res => {
                console.log('undate success')
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
    onSuccessImgFiles(files) {
      console.log('onSuccessImgFiles', files)
      this.ruleForm.files = files
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
    next(i) {
      if (i === 1 && this.step === 0 && this.ruleForm.sport_item_id === '') {
        this.$message({
          message: '请选择教案',
          type: 'success',
          duration: 5 * 1000
        })
        return
      }
      this.step += i
      if (this.step === 2) {
        this.submitForm('ruleForm', 1)
      }
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
