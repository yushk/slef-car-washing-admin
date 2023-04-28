<template>
  <div class="index-container">
    <el-card>
      <div class="top">

        <el-input
          v-model="search"
          size="small"
          placeholder="输入关键字搜索"
          class="searchinput"
          @keyup.enter="query"
        />
        <el-button type="primary" size="small" @click="query">搜索</el-button>
        <el-button type="success" size="small" @click="create">新建</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;height:70vh"
      >
        <el-table-column
          label="id"
          prop="id"
        />
        <el-table-column
          label="帐号"
          prop="name"
        />
        <el-table-column
          label="昵称"
          prop="nickName"
        />
        <el-table-column
          label="电话"
          prop="phone"
        />
        <el-table-column
          label="邮箱"
          prop="email"
        />
        <el-table-column
          label="角色"
          prop="role"
        >
          <template slot-scope="scope">
            {{ rolesDic[scope.row.role] }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          :width="300"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit('ps', scope.row)"
            >重置密码</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit('info', scope.row)"
            >修改信息</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="changePage"
      />
    </el-card>
    <el-drawer
      :title="type==='new'?'新建':'编辑'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="帐号" prop="name">
          <el-input v-model="ruleForm.name" :disabled="type==='edit'" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="ruleForm.nickName" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="ruleForm.role" placeholder="请选择用户角色" :disabled="editType==='ps'">
            <el-option v-for="(key,index) in rolesDic" :key="index" :label="key" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone" :disabled="editType==='ps'" />
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="ruleForm.email" :disabled="editType==='ps'" />
        </el-form-item>
        <el-form-item v-if="editType==='ps'||type==='new'" label="密码" prop="ps">
          <el-input v-model="ruleForm.ps" show-password auto-complete="new-password" />
        </el-form-item>
        <el-form-item v-if="editType==='ps'||type==='new'" label="确认密码" prop="reps">
          <el-input v-model="ruleForm.reps" show-password />
        </el-form-item>
        <span class="dialog-footer u-flex u-flex-end">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { CreateUser, GetUsers, UpdateUser, ChangeUserPassword, DeleteUser } from '@/api/apis'
import { rolesDic } from '@/settings'
const user = {
  name: '',
  phone: '',
  nickName: '',
  ps: '123456',
  reps: '123456',
  role: '',
  email: ''
}
export default {
  name: 'User',
  data() {
    return {
      tableData: [],
      search: '',
      dialogVisible: false,
      ruleForm: user,
      rules: {
        name: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        ps: [
          { required: false, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        reps: [
          { required: false, validator: this.checkConfirmPassword, trigger: 'blur' }
        ],
        phone: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '11位手机号码', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      type: 'new',
      rolesDic: rolesDic,
      editType: 'info'
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    changePage(v) {
      this.currentPage = v
      this.query()
    },
    query() {
      var obj = {
        skip: this.pageSize * (this.currentPage - 1),
        limit: this.pageSize,
        query: JSON.stringify({ name: { '$ne': 'club@123', '$regex': this.search }})
      }
      GetUsers(obj).then(res => {
        const { items, total_count } = res
        this.tableData = items
        this.total = total_count
      })
    },
    create() {
      this.clear()
      this.dialogVisible = true
      this.type = 'new'
    },
    handleEdit(index, row) {
      this.editType = index
      this.type = 'edit'
      // 编辑的时候
      this.ruleForm = Object.assign({ ps: '', reps: '' }, row)
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('确认删除该用户？')
        .then(_ => {
          DeleteUser({ id: row.id }).then(
            res => {
              this.$message.success('删除成功')
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
    clear() {
      this.ruleForm = Object.assign({}, user)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 'new') {
            CreateUser({ body: this.ruleForm }).then(
              res => {
                this.$message.success(' 创建成功')
                this.clear()
                this.query()
                this.dialogVisible = false
              }
            )
          } else {
            const body = Object.assign({}, this.ruleForm)
            delete body.id
            if (this.editType === 'info') {
              UpdateUser({ id: this.ruleForm.id, body }).then(
                res => {
                  this.$message.success('编辑成功')
                  this.clear()
                  this.query()
                  this.dialogVisible = false
                }
              )
            } else {
              ChangeUserPassword({ id: this.ruleForm.id, username: body.name, password: body.ps }).then(res => {
                this.$message.success('编辑成功')
                this.clear()
                this.query()
                this.dialogVisible = false
              })
            }
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
    // 确认密码
    checkConfirmPassword(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入确认密码'))
      }
      if (value !== this.ruleForm.ps) {
        return callback(new Error('两次密码输入不一致，请重新输入'))
      }
      callback()
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
