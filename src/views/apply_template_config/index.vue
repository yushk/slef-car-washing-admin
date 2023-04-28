<template>
  <div class="m-4 index-container">
    <Table
      :table-key="tableKey"
      :table-data="tableData"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @changePage="changePage"
    >
      <template #search>
        <el-input v-model="search" size="small" placeholder="输入关键字搜索" class="searchinput" @keyup.enter="query" />
        <el-button type="primary" size="small" @click="query">搜索</el-button>
        <el-button type="success" size="small" @click="create">新建</el-button>
      </template>
      <template #operate>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              v-if="roles.includes('root') || scope.row.auth_user.includes($store.state.user.userid)"
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
      :title="type === 'new' ? '创建' : '修改'"
      :visible.sync="dialogVisible"
      size="80%"
      style="overflow-y:auto"
      :before-close="handleClose"
    >
      <div style="overflow:auto;height:calc(100vh - 150px)">
        <el-form
          ref="ruleForm"
          :inline="true"
          size="small"
          :model="ruleForm"
          :rules="rules"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item label="一级指标" prop="first">
            <el-select
              v-model="ruleForm.first"
              placeholder="请输选择一级指标"
              filterable
              allow-create
              style="width:300px"
              @change="firstDicChange"
            >
              <template #empty>
                <div class="p-4">
                  <span class="mr-2 text-base">暂无一级指标</span>
                  <el-button type="primary" size="small" @click="$router.push({ path: '/dic/first' })">去添加</el-button>
                </div>
              </template>
              <el-option v-for="item in firstDicOptions" :key="item.id" :label="item.label" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="二级指标" prop="second">
            <el-select v-model="ruleForm.second" placeholder="请输选择二级指标" style="width:300px">
              <template #empty>
                <div class="p-4">
                  <span class="mr-2 text-base">暂无二级指标</span>
                  <el-button type="primary" size="small" @click="$router.push({ path: '/dic/second' })">去添加</el-button>
                </div>
              </template>
              <el-option v-for="item in secondDicOptions" :key="item.id" :label="item.label" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="三级指标" prop="label" class="w-full">
            <el-input v-model="ruleForm.label" style="width:500px" />
          </el-form-item>
          <el-form-item label="开启资料上传" prop="uploadFile">
            <el-radio-group v-model="ruleForm.uploadFile">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="资料名" prop="fileName">
            <el-input v-model="ruleForm.fileName" style="width:300px" />
          </el-form-item>
          <el-form-item label="资料类型" prop="fileType">
            <el-select v-model="ruleForm.fileType" placeholder="请输选择上传文件类型" style="width:300px">
              <el-option v-for="item in fileTypeOptions" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item prop="approver" label="仅自评" class="w-full">
            <el-radio-group v-model="ruleForm.approver">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="评分标准" prop="Evaluates" style="width:100%;display: flex;">
            <table border="1" style="width:100%;position: relative;">
              <tr>
                <th class="w-12 border">{{ tablehead.score }}</th>
                <th class="border w-96">{{ tablehead.desc }}</th>
                <th class="w-12">
                  <el-button type="primary" @click="gradeTableAdd">添加评分标准</el-button>
                </th>
              </tr>
              <tr v-for="(grade, index) in questionOptions " :key="index + 'sdf'">
                <td>
                  <el-input v-model="grade.score" placeholder="请填写分数 如：50" />
                </td>
                <td>
                  <el-input
                    v-model="grade.desc"
                    type="textarea"
                    autosize
                    placeholder="请填写标准描述 如：登记注册各项手续齐全，在参评前一年年检合格得15分"
                  />
                </td>
                <td class="flex justify-center">
                  <el-button class="w-24" type="danger" @click="delGrade(index)"> 删除</el-button>
                </td>
              </tr>
            </table>

          </el-form-item>
        </el-form>
      </div>
      <div class="flex justify-end">
        <el-popconfirm title="确认直接关闭么？" @onConfirm="dialogVisible = false">
          <el-button slot="reference" type="info">关闭</el-button>
        </el-popconfirm>
        <span style="width:10px" />
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <span style="width:100px" />
      </div>
    </el-drawer>
  </div>
</template>
<script>

import { CreateSportItem, GetSportItems, GetSportItem, UpdateSportItem, DeleteSportItem, GetUsers, GetSportTypes } from '@/api/apis'

import Table from '@/components/Table'
import { parseTime } from '@/utils/index'
import { fileType } from '@/settings'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'ApplyTemplateConfig',
  components: { Table },
  data() {
    return {
      tableKey: [
        { label: '一级指标', key: 'firstName', width: 120 },
        { label: '二级指标', key: 'secondName', width: 120 },
        { label: '三级指标', key: 'label' },
        { label: '材料上传', key: 'uploadFileTag', width: 100, type: 'tag' },
        { label: '仅自评', key: 'approverTag', width: 100, type: 'tag' },
        { label: '更新时间', key: 'update_time', parse: 1, type: 'time', Func: parseTime, width: 150 }],
      tableData: [],
      search: '',
      dialogVisible: false,
      ruleForm: {
        first: '', // 一级指标
        second: '', // 二级指标
        label: '', // 三级指标
        uploadFile: '1', // 是否开启上传文件
        fileName: '', // 上传文件名
        fileType: '', // 上传文件类型
        approver: '0' // 仅自评

      },
      questionOptions: [
        {
          id: '001',
          score: '',
          desc: ''
        }
      ],
      rules: {
        first: [
          { required: true, message: '请选择一级指标', trigger: 'blur' }
        ],
        second: [
          { required: true, message: '请选择二级指标', trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请输入三级指标', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      type: 'new',
      useroptions: [],
      loading: {
        user: false,
        course: false
      },
      tablehead: {
        score: '分数',
        desc: '描述'
      },
      firstDicOptions: [],
      secondDicOptions: [],
      allDicOptions: [],
      fileTypeOptions: fileType,
      alluseroptions: []
    }
  },
  async created() {
    await this.getDic()
    await this.firstDicChange('')
    // await this.remoteUser('')
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
    },
    changePage(v) {
      this.currentPage = v
      this.query()
    },
    // 获取运动类别
    async getDic() {
      var obj = {
        skip: 0,
        limit: 0,
        query: JSON.stringify({ level: 'first' })
      }
      const { items } = await GetSportTypes(obj)
      this.firstDicOptions = items
    },
    async firstDicChange(v) {
      var obj = {
        skip: 0,
        limit: 0,
        query: JSON.stringify({ level: 'second', parent_id: v })
      }
      if (v === '') {
        delete obj.query
      }
      const { items } = await GetSportTypes(obj)
      if (v === '') {
        this.allDicOptions = items
      }
      this.secondDicOptions = items
    },
    query() {
      var obj = {
        skip: this.pageSize * (this.currentPage - 1),
        limit: this.pageSize,
        query: JSON.stringify({})
      }
      GetSportItems(obj).then(res => {
        const { items, total_count } = res
        this.tableData = items.map((e) => {
          return {
            ...e,
            firstName: this.allDicOptions.find((au) => (au.id === e.first))?.label || '',
            secondName: this.allDicOptions.find((au) => (au.id === e.second))?.label || '',
            uploadFileTag: e.uploadFile === '1' ? [{ type: 'success', name: '开启' }] : [{ type: 'warning', name: '关闭' }],
            // uploadFileTag: e.uploadFile === '1' ? [{ type: 'success', name: '开启' }] : [{ type: 'warning', name: '关闭' }],
            approverTag: e.approver === '1' ? [{ type: 'success', name: '开启' }] : [{ type: 'warning', name: '关闭' }]
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
        this.ruleForm = res
        this.questionOptions = res.questionOptions
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
        .catch(_ => { })
    },
    handleClose(done) {
      this.$confirm('是否保存？')
        .then(_ => {
          this.submitForm('ruleForm')
          done()
        })
        .catch(_ => {
          done()
        })
    },
    submitForm(formName) {
      const obj = Object.assign({}, this.ruleForm)
      delete obj.id
      obj.questionOptions = this.questionOptions
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 'new') {
            CreateSportItem({ body: obj }).then(
              res => {
                this.$message.success(' 创建成功')
                this.query()
                this.resetForm('ruleForm')
                this.dialogVisible = false
              }
            )
          } else {
            UpdateSportItem({ id: this.ruleForm.id, body: obj }).then(
              res => {
                this.$message.success('更新成功')
                this.query()
                this.resetForm('ruleForm')
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
    },
    gradeTableAdd() {
      this.questionOptions.push({
        id: uuidv4(),
        score: '',
        desc: ''
      })
    },
    delGrade(i) {
      this.$confirm(`将删除评价标准： ${this.questionOptions[i].desc}`).then(_ => {
        this.questionOptions.splice(i, 1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  .top {
    display: flex;
    justify-content: flex-start;
  }

  .demo-ruleForm {
    position: relative;
  }

  ::v-deep.el-form-item__content {
    flex: 1;
  }
}
</style>
