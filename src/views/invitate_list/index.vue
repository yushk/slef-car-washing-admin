<template>
  <div class="flex flex-col h-full index-container">
    <!-- <div ref="box" class="box">
      <div class="left" />
      <div class="resize" title="收缩侧边栏">
        ⋮
      </div>
      <div class="mid" />
      <div class="resize" title="收缩侧边栏">
        ⋮
      </div>
      <div class="right" />
    </div> -->

    <div class="flex flex-row w-full h-full overflow-hidden">
      <AutoDiv class="flex-1 w-1/4">
        <Table :table-key="tableKey" :table-data="tableData" :current-page="currentPage" :page-size="pageSize" :total="total" @rowClick="getsolutions" @changePage="changeHomeWorkPage">
          <template #search>
            <h2>课程列表</h2>
            <el-input
              v-model="search"
              size="small"
              placeholder="输入关键字搜索"
              class="searchinput"
              @keyup.enter="query"
            />
            <el-button type="primary" size="small" @click="query">搜索</el-button>
          </template>
          <template #operate>
            <el-table-column
              label="操作"
              fixed="right"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click.stop="getsolutions(scope.row)"
                >查看作业</el-button>
              </template>
            </el-table-column>
          </template>
        </Table>
      </AutoDiv>
      <AutoDiv v-if="showSolutions" class="flex-1 w-1/4">
        <Table class="flex-1 h-full" :table-key="tableKey1" :table-data="solutions" :current-page="solutionsPage.currentPage" :page-size="solutionsPage.pageSize" :total="solutionsPage.total" @rowClick="getRemarks" @changePage="changeSolutionsPage">
          <template #search>
            <h2>作业列表</h2>

            <el-input
              v-model="search"
              size="small"
              placeholder="输入关键字搜索"
              class="searchinput"
              @keyup.enter="query"
            />
            <el-button type="primary" size="small" @click="query">搜索</el-button>
            <el-button type="danger" class="float-right" size="small" @click="showSolutions=false;solutions=[]">关闭</el-button>
          </template>
          <template #operate>

            <el-table-column
              label="操作"
              fixed="right"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  :disabled="scope.row.desc!=='1'"
                  @click.stop="getRemarks(scope.row)"
                >查看评价</el-button>
              </template>
            </el-table-column>
          </template>
        </Table>
      </AutoDiv>
      <AutoDiv v-if="showRemark" class="flex-auto w-1/2">
        <Table class="flex-1 h-full" :table-key="tableKey2" :table-data="remarks" :current-page="remarkPage.currentPage" :page-size="remarkPage.pageSize" :total="remarkPage.total" @changePage="changeRemarksPage">
          <template #search>
            <h2>评论列表</h2>
            <el-input
              v-model="search"
              size="small"
              placeholder="输入关键字搜索"
              class="searchinput"
              @keyup.enter="query"
            />
            <el-button type="primary" size="small" @click="getRemarks">搜索</el-button>
            <el-button type="success" size="small" @click="create">添加</el-button>
            <el-button type="danger" class="float-right" size="small" @click="showRemark=false;remarks=[]">关闭</el-button>
          </template>
          <template #operate>

            <el-table-column
              label="操作"
              fixed="right"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click.stop="handleEdit( scope.row)"
                >查看</el-button>
              </template>
            </el-table-column>
          </template>
        </Table>
      </AutoDiv>
      <!-- <AutoDiv /> -->
    </div>

    <el-drawer
      title="作业评价"
      :visible.sync="dialogVisible"
      size="80%"
      :before-close="handleClose"
    >
      <div style="overflow:auto;height:calc(100vh - 150px)">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
          <el-form-item label="作业内容">
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
          <el-form-item
            label="评价"
          >
            <table border="1" style="width:100%;position: relative;">
              <tr v-for="(grade,index) in grade_val" :key="index+'sdf'">
                <th class="border w80">{{ grade.name }}</th>
                <th class="border w80">
                  <el-radio v-model="grade.excellent" label="95">{{ tablehead.excellent }}
                  </el-radio>
                </th>
                <th class="border w80">
                  <el-radio v-model="grade.excellent" label="85">{{ tablehead.good }}</el-radio>
                </th>
                <th class="border w80"> <el-radio v-model="grade.excellent" label="75">{{ tablehead.pass }}</el-radio></th>
                <th class="border w80"><el-radio v-model="grade.excellent" label="55">{{ tablehead.flunk }}</el-radio></th>
              </tr>
            </table>
          </el-form-item>
          <el-form-item
            prop="note"
            label="评价信息"
          >
            <el-input v-model="ruleForm.note" type="textarea" autosize placeholder="评价信息" />
          </el-form-item>
          <div class="space-x-4 u-flex u-flex-end">
            <el-popconfirm
              title="确认直接关闭么？"
              @onConfirm="dialogVisible = false"
            >
              <el-button slot="reference" type="warning">关闭</el-button>
            </el-popconfirm>
            <el-popconfirm
              title="提交后将不能再修改，确认提交？"
              @onConfirm="submitForm('ruleForm')"
            >
              <el-button slot="reference" type="primary">提 交</el-button>
            </el-popconfirm>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Table from '@/components/Table'
import AutoDiv from '@/components/AutoDiv'
import { GetHomeWorks, GetSolutions, GetEvaluateInfos, GetUsers, CreateEvaluateInfo, UpdateEvaluateInfo } from '@/api/apis'
import { parseTime } from '@/utils/index'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'InvitateList',
  components: { AutoDiv,
    Table
  },
  data() {
    return {
      oss: null,
      tableData: [],
      tableKey: [
        { label: '课程名称', key: 'title', width: 300 },
        { label: '课程视频', key: 'videos', type: 'link' },
        { label: '人数', key: 'number' },
        { label: '老师', key: 'teacher' }
        // { label: '二维码', key: 'QR_code', type: 'qr' },
        // { label: '开始时间', key: 'start_time', parse: 1, type: 'time', Func: parseTime, width: 150 },
        // { label: '截至时间', key: 'end_time', parse: 1, type: 'time', Func: parseTime, width: 150 }
      ],
      tableKey1: [
        { label: '作业视频', key: 'videos', type: 'link' },
        { label: '完成情况', key: 'typeLabel', type: 'tag' },
        { label: '学生', key: 'student_name', width: 100 },
        { label: '更新时间', key: 'commit_time', parse: 1, type: 'time', Func: parseTime, width: 150 }
      ],
      tableKey2: [
        { label: '评论人', key: 'name' },
        { label: '综合分数', key: 'score' },
        { label: '信息', key: 'note' }
      ],
      search: '',
      dialogVisible: false,
      rules: {
        content: [
          { required: true, message: '请输入课程内容', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      solutionsPage: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      remarkPage: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      ruleForm: {
        'userid': '',
        'score': '',
        'status': '',
        'value': '',
        'content': ''
      },
      alluseroptions: [],
      solutions: [],
      showSolutions: false,
      remarks: [],
      showRemark: false,
      currentHomeWork: {},
      currentSolutions: {},
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
  async mounted() {
    await this.remoteUser('')
    this.query()
  },
  beforeDestroy() {
  },
  methods: {
    changeHomeWorkPage(v) {
      this.currentPage = v
      this.query()
    },
    changeSolutionsPage(v) {
      this.solutionsPage.currentPage = v
      this.getsolutions()
    },
    changeRemarksPage(v) {
      this.remarkPage.currentPage = v
      this.getRemarks()
    },
    getRemarks(row) {
      if (!row) {
        row = this.currentSolutions
      }
      console.log('currentSolutions:', row)
      this.solutionsVideos = JSON.parse(row.content || '[]')
      this.currentSolutions = row
      this.showRemark = true
      var obj = {
        skip: this.remarkPage.pageSize * (this.remarkPage.currentPage - 1),
        limit: this.remarkPage.pageSize,
        query: JSON.stringify({ solution_id: row.id })
      }
      GetEvaluateInfos(obj).then(res => {
        const { items, total } = res
        this.remarks = items.map((e) => {
          const s = e.Evaluates.reduce(
            (accumulator, currentValue) => (Number(accumulator) + Number(currentValue.excellent)),
            0
          ) / e.Evaluates.length
          return {
            ...e,
            score: Number(s).toFixed(2)
          }
        })
        this.remarkPage.total = total
      })
    },
    getsolutions(row) {
      if (!row) {
        row = this.currentHomeWork
      }
      this.currentHomeWork = row
      this.grade_table = this.currentHomeWork.sport_item.Evaluates || []
      this.grade_val = this.grade_table.map((e) => ({ name: e.name, excellent: '1' }))
      var obj = {
        skip: this.solutionsPage.pageSize * (this.solutionsPage.currentPage - 1),
        limit: this.solutionsPage.pageSize,
        query: JSON.stringify({ work_id: row.id })
      }
      this.remarks = []
      this.showRemark = false
      GetSolutions(obj).then(res => {
        const { items, total_count } = res
        this.showSolutions = true
        this.solutions = items.map(e => {
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
    async remoteUser(query) {
      var obj = {
        skip: 0,
        limit: 0,
        query: JSON.stringify({ name: { '$regex': query }, '$or': [{ role: 'teacher' }, { role: 'root' }] })
      }
      const { items } = await GetUsers(obj)
      const useroptions = items.map((e) => ({ label: e.name, value: e.id }))
      if (query === '') {
        this.alluseroptions = useroptions
      }
    },
    query() {
      var q = {}
      // // 默认为学生角色 查看自己参加的课程
      // q = Object.assign({ 'solutionsinfo': { '$elemMatch': { 'student_id': this.$store.state.user.userid }}}, { 'title': {
      //   '$regex': this.search
      // }})
      // // 老师只查看自己创建的课程
      // if (this.roles.includes('teacher')) {
      //   q = Object.assign({ teacher: this.$store.state.user.userid, 'title': {
      //     '$regex': this.search
      //   }})
      // }
      var obj = {
        skip: this.pageSize * (this.currentPage - 1),
        limit: this.pageSize,
        query: JSON.stringify(q)
      }

      // // 管理员可以查看全部
      // if (this.roles.includes('root')) {
      // }
      obj.query = JSON.stringify({ 'title': {
        '$regex': this.search
      }})

      GetHomeWorks(obj).then(res => {
        const { items, total_count } = res
        this.tableData = items.map((e) => {
          return {
            ...e,
            QR_code: e.id,
            videos: e.sport_item.videos,
            label: e.sport_item.lable,
            teacher: this.alluseroptions.find((u) => (u.value === e.teacher)).label
          }
        })
        this.total = total_count
      })
    },
    create() {
      this.type = 'new'
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.type = 'edit'
      this.ruleForm = Object.assign({}, row)
      this.grade_val = row.Evaluates
      this.dialogVisible = true
      console.log('row', row)
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm(formName) {
      var obj = {
        name: this.$store.state.user.name,
        home_work_id: this.currentHomeWork.id,
        solution_id: this.currentSolutions.id,
        user_id: this.$store.state.user.userid,
        Evaluates: this.grade_val,
        note: this.ruleForm.note
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 'edit') {
            UpdateEvaluateInfo({ work_id: this.currentSolutions.id, id: this.ruleForm.id, body: obj }).then(
              res => {
                this.$message.success('提交成功')
                this.getRemarks()
                this.dialogVisible = false
              }
            )
          } else {
            obj.id = uuidv4()
            CreateEvaluateInfo({ work_id: this.currentSolutions.id, body: obj }).then(
              res => {
                this.$message.success('提交成功')
                this.getRemarks()
                this.dialogVisible = false
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
    .box {
        width: 100%;
        height: 100%;
        margin: 1% 0px;
        overflow: hidden;
        position: absolute;
        box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);
    }

     /*左侧div样式*/
    .left {
        width: calc(32% - 10px);  /*左侧初始化宽度*/
        height: 100%;
        background: #FFFFFF;
        float: left;
    }
    /*拖拽区div样式*/
    .resize {
        cursor: col-resize;
        float: left;
        position: relative;
        top: 45%;
        background-color: #d6d6d6;
        border-radius: 5px;
        margin-top: -10px;
        width: 10px;
        height: 50px;
        background-size: cover;
        background-position: center;
        /*z-index: 99999;*/
        font-size: 32px;
        color: white;
    }
    /*拖拽区鼠标悬停样式*/
    .resize:hover {
        color: #444444;
    }
    /*右侧div'样式*/
    .mid {
        float: left;
        width: calc(32% - 10px);   /*右侧初始化宽度*/
        height: 100%;
        background: #fff;
        box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.11);
    }
    .right {
        float: left;
        width: calc(32% - 10px);   /*右侧初始化宽度*/
        height: 100%;
        background: #fff;
        box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.11);
    }

  }
  </style>

