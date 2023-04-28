<template>
  <div class="index-container">
    <Table :table-key="tableKey" :table-data="tableData" :current-page="currentPage" :page-size="pageSize" :total="total" @changePage="changePage">
      <template #search>
        <div class="top u-flex u-flex-items-center">
          选择课程：&nbsp;
          <el-select
            v-model="search.work_id"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入课程名称"
            :remote-method="remoteCourse"
            :loading="loading.course"
          >
            <el-option
              v-for="item in courseoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          &nbsp;学生姓名：&nbsp;
          <el-select
            v-model="search.student_id"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入学生姓名"
            :remote-method="remoteUser"
            :loading="loading.user"
          >
            <el-option
              v-for="item in useroptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-button type="primary" size="small" @click="query">搜索</el-button>
        </div>
      </template>
      <template #operate>
        <el-table-column
          label="操作"
          fixed="right"
          :width="100"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            >查看</el-button>
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
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item
          label="作业内容"
        >
          <div v-for="(item,index) in solutionsVideos" :key="index">
            <video :key="index+'video'" :src="item.url" controls style="width:400px" />
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </div>
        </el-form-item>
        <el-form-item
          label="评价标准"
        >
          <table border="1" style="width:100%;position: relative;">
            <tr>
              <th class="border w80">{{ tablehead.name }}</th>
              <th class="border w80">{{ tablehead.excellent }}</th>
              <th class="border w80">{{ tablehead.good }}</th>
              <th class="border w80">{{ tablehead.pass }}</th>
              <th class="border w80">{{ tablehead.flunk }}</th>
            </tr>
            <tr v-for="(grade,index) in grade_table" :key="index+'sdf'">
              <td class="w80">
                  &nbsp;
                <span>{{ grade.name }}</span>
              </td>
              <td class="w80">
                <span>{{ grade.excellent }}</span>
              </td>
              <td class="w80">
                <span>{{ grade.good }}</span>
              </td>
              <td class="w80">

                <span>{{ grade.pass }}</span>
              </td>
              <td class="w80">
                <span>{{ grade.flunk }}</span>
              </td>
            </tr>
          </table>
        </el-form-item>
        <!-- <el-form-item
          label="评价"
        >
          <table border="1" style="width:100%;position: relative;">
            <tr v-for="(grade,index) in grade_val" :key="index+'sdf'">
              <th class="border w80">{{ grade.name }}</th>
              <th class="border w80">
                <el-radio v-model="grade.excellent" label="1">{{ tablehead.excellent }}
                </el-radio>
              </th>
              <th class="border w80">
                <el-radio v-model="grade.excellent" label="2">{{ tablehead.good }}</el-radio>
              </th>
              <th class="border w80"> <el-radio v-model="grade.excellent" label="3">{{ tablehead.pass }}</el-radio></th>
              <th class="border w80"><el-radio v-model="grade.excellent" label="5">{{ tablehead.flunk }}</el-radio></th>
            </tr>
          </table>
        </el-form-item> -->
        <div class="u-flex u-flex-end">
          <el-button slot="reference" type="warning" @click="dialogVisible = false">关闭</el-button>
          <!-- <el-button slot="reference" type="primary" class="ml-2" @click="submitForm('ruleForm')">保存</el-button> -->
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { GetSolutions, UpdateSolution, GetHomeWorks, GetUsers, GetHomeWork } from '@/api/apis'
import { parseTime } from '@/utils/index'
import Table from '@/components/Table'
export default {
  name: 'User',
  components: { Table
    // UploadImage
  },
  data() {
    return {
      oss: null,
      tableData: [],
      tableKey: [
        { label: '课程名称', key: 'title' },
        { label: '学生', key: 'student_name', width: 100 },
        { label: '作业视频', key: 'videos', type: 'link' },
        { label: '完成情况', key: 'typeLabel', type: 'tag' },
        { label: '更新时间', key: 'commit_time', parse: 1, type: 'time', Func: parseTime, width: 120 }
      ],
      search: { title: [], userid: [] },
      dialogVisible: false,
      ruleForm: {
        title: '', // 课程标题
        files: [{ name: '', url: '' }], // 附件列表
        content: '', // 课程内容  html 格式
        score: '', // 课程内容  html 格式
        note_info: [],
        noter: [],
        note: ''
      },
      rules: {
        note: [
          { required: true, message: '请输入批注', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入作业成绩', trigger: 'blur' }
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
      courseoptions: [],
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
          name: '动作1',
          excellent: '',
          good: '',
          pass: '',
          flunk: ''
        }
      ],
      grade_val: [
        {
          name: '',
          excellent: ''
        }
      ],
      solutionsVideos: []

    }
  },
  mounted() {
    this.remoteCourse('')
    this.query()
    this.remoteUser('')
  },
  beforeDestroy() {

  },
  methods: {
    changePage(v) {
      this.currentPage = v
      this.query()
    },
    remoteCourse() {
      this.loading.course = true
      var obj = {
        skip: 0,
        limit: 10,
        query: JSON.stringify({ teacher: this.$store.state.user.userid })
      }
      // 管理员可以查看全部
      if (this.roles.includes('root')) {
        obj.query = ''
      }
      GetHomeWorks(obj).then(res => {
        const { items } = res
        console.log('items:', items)
        this.courseoptions = items.map((e) => ({ label: e.sport_item.lable, value: e.id }))
        this.loading.course = false
      })
    },
    remoteUser(query) {
      this.loading.user = true
      var obj = {
        skip: 0,
        limit: 10,
        query: JSON.stringify({ name: { '$regex': query }, '$or': [{ role: 'student' }] })
      }
      GetUsers(obj).then(res => {
        const { items } = res
        this.useroptions = items.map((e) => ({ label: e.name, value: e.id }))
        this.loading.user = false
      })
    },

    query() {
      console.log('this.search', this.search)
      var query = Object.assign({}, this.search)
      console.log('query', query)
      // 管理员可以查看全部
      var q = { teachers: { $in: [this.$store.state.user.userid] }}
      if (this.roles.includes('root')) {
        delete query.teachers
      }
      Object.keys(query).forEach(e => {
        if (query[e] instanceof Array) {
          if (query[e].length > 0) {
            const arr = query[e].map((item) => {
              const o = {}
              o[e] = item
              return o
            })
            if (q['$and']) {
              q['$and'].push({ '$or': arr })
            } else {
              q['$and'] = [{ '$or': arr }]
            }
          }
        } else {
          if (query[e]) {
            q[e] = query[e]
          }
        }
      })
      console.log('query:', q)
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
      this.ruleForm = Object.assign({ }, row)
      this.solutionsVideos = JSON.parse(row.content || '[]')
      GetHomeWork({ id: row.work_id }).then(res => {
        this.sportItem = res.sport_item
        this.grade_table = res.sport_item.Evaluates || []
        this.ruleForm.title = res.title
        this.grade_val = row.Evaluates
        this.dialogVisible = true
      })

      console.log('this.ruleForm', this.ruleForm)
    },
    handleClose(done) {
      // this.$confirm('是否保存？', { confirmButtonText: '保存',
      //   cancelButtonText: '关闭' })
      //   .then(_ => {
      //     this.submitForm('ruleForm')
      //     done()
      //   })
      //   .catch(_ => {
      //   })
      done()
    },
    submitForm(formName) {
      const obj = Object.assign({}, this.ruleForm)
      delete obj.id
      this.$refs[formName].validate((valid) => {
        if (valid) {
          UpdateSolution({ id: this.ruleForm.id, body: obj }).then(
            res => {
              this.$message.success('编辑成功')
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
