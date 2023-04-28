<template>
  <div class="index-container">
    <Table
      :table-key="tableKey"
      :table-data="tableData"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @changePage="changePage"
    >
      <template #search>

        <el-input v-model="search" size="small" placeholder="输入关键字搜索" class="searchinput" @keyup.enter.native="query" />
        <el-button type="primary" size="small" @click="query">搜索</el-button>
        <el-button type="success" size="small" @click="dialogVisible = true; type = 'new'">新建</el-button>
      </template>
      <template #operate>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </template>
    </Table>
    <el-drawer :title="type === 'new' ? '新建' : '编辑'" :visible.sync="dialogVisible" width="40%">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="名称" prop="label">
          <el-input v-model="ruleForm.label" />
        </el-form-item>

        <el-form-item label="编码" prop="code">
          <el-input v-model="ruleForm.code" />
        </el-form-item>

        <span class="dialog-footer flex justify-end">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { CreateSportType, GetSportTypes, UpdateSportType, DeleteSportType } from '@/api/apis'
import Table from '@/components/Table'
export default {
  name: 'User',
  components: {
    Table
  },
  data() {
    return {
      tableData: [{ label: '跳远', code: 'ty' }],
      tableKey: [
        { label: '名称', key: 'label' },
        { label: '编码', key: 'code' }
      ],
      search: '',
      dialogVisible: false,
      ruleForm: {
        label: '',
        code: ''
      },
      rules: {
        label: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      type: 'new'
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    changePage(index) {
      this.currentPage = index
      this.query()
    },
    query() {
      var obj = {
        skip: this.pageSize * (this.currentPage - 1),
        limit: this.pageSize,
        query: JSON.stringify({
          label: {
            '$regex': this.search
          }
        })
      }
      GetSportTypes(obj).then(res => {
        const { items, total_count } = res
        this.tableData = items
        this.total = total_count
      })
    },
    handleEdit(index, row) {
      this.type = 'edit'
      this.ruleForm = Object.assign({}, row)
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('确认删除？')
        .then(_ => {
          DeleteSportType({ id: row.id }).then(
            res => {
              this.$message.success('删除成功')
              this.query()
            }
          )
        })
        .catch(_ => { })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    clear() {
      this.ruleForm = {
        label: '',
        code: ''
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 'new') {
            CreateSportType({ body: this.ruleForm }).then(
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
            UpdateSportType({ id: this.ruleForm.id, body }, this.ruleForm).then(
              res => {
                this.$message.success('编辑成功')
                this.clear()
                this.query()
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
.index-container {
  .top {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
