<template>
  <div class="index-container">
    <el-card>
      <div class="top">

        <el-input
          v-model="search"
          size="small"
          placeholder="输入姓名或手机号"
          class="searchinput"
          @keyup.native.enter="searchfunc"
        />
        <el-button type="primary" size="small" @click="searchfunc">搜索</el-button>
        <!-- <el-button type="success" size="small" @click="dialogVisible = true; type='new'">新建</el-button> -->
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;height:70vh"
      >
        <el-table-column
          v-for="(item) in tableKey"
          :key="item.key"
          :label="item.label"
          :prop="item.key"
          :fixed="item.fixed||false"
          :width="item.width||80"
        >
          <template slot-scope="scope">
            <span v-if="item.parse||false">
              {{ item.parseFunc(scope.row[item.key]) }}
            </span>
            <span v-else>
              {{ scope.row[item.key] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          :width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.row.unionid)"
            >详细</el-button>
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
    <el-dialog
      :title="type==='new'?'新建':'编辑'"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="名称" prop="label">
          <el-input v-model="ruleForm.label" />
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="ruleForm.code" :disabled="type==='edit'" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="ruleForm.desc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Service from '@/api/members'
import { parseTime } from '@/utils/index'
export default {
  name: 'Members',
  data() {
    return {
      parseTime,
      tableData: [],
      tableKey: [
        { label: '姓名', key: 'name', fixed: true },
        // { label: '性别', key: 'sex' },
        // { label: '民族', key: 'nation' },
        // { label: '血型', key: 'bloodType' },
        // { label: '出生年月', key: 'birthday', width: 150 },
        // { label: '属相', key: 'shuxiang' },
        // { label: '星座', key: 'xingzuo' },
        // { label: '常驻地', key: 'changzhudi', width: 300 },
        // { label: '身份证', key: 'shenfenzheng', width: 180 },
        // { label: '身高', key: 'shengao' },
        // { label: '体重', key: 'tizhong' },
        // { label: '身体状况', key: 'shentizhuangkuang', width: 150 },
        // { label: '兴趣爱好', key: 'xingquaihao', width: 200 },
        // { label: '毕业院校', key: 'biyeyuanxiao', width: 200 },
        // { label: '学历', key: 'xueli' },
        // { label: '专业', key: 'zhuanye' },
        // { label: '行业', key: 'hangye' },
        // { label: '政治面貌', key: 'zhengzhimianmao' },
        // { label: '家庭住址', key: 'jiatingzhuzhi', width: 300 },
        // { label: '公司', key: 'company', width: 200 },
        // { label: '职业', key: 'zhiye' },
        // { label: '收入', key: 'shouru' },
        // { label: '电话', key: 'phone', width: 150 },
        // { label: '婚姻情况', key: 'hunyinqingkuang' },
        // { label: '房产', key: 'fangchan' },
        // { label: '车辆', key: 'car' },
        // { label: '家庭成员', key: 'members', parse: 1, parseFunc: (e) => { return e.length } },
        // { label: '择偶要求', key: 'require', fixed: 'right' },
        { label: '创建时间', key: 'createTime', parse: 1, parseFunc: parseTime, width: 200 },
        { label: '更新时间', key: 'updateTime', parse: 1, parseFunc: parseTime, width: 200 }
      ],
      search: '',
      dialogVisible: false,
      ruleForm: {
        lael: '',
        code: '',
        desc: ''
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
    searchfunc() {
      this.currentPage = 1
      this.query()
    },
    query() {
      var obj = {
        currentpage: this.currentPage,
        perpage: this.pageSize,
        like: JSON.stringify({ '$or': [{ name: { '$regex': this.search }}, { phone: { '$regex': this.search }}] })
      }
      Service.list(obj).then(res => {
        this.tableData = []
        const { data, count } = res
        this.tableData.push(...data)
        this.total = count
      })
    },
    changePage(v) {
      this.currentPage = v
      this.query()
    },
    handleEdit(id) {
      this.$router.push(`/members/detail/${id}`)
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('确认删除该条数据？')
        .then(_ => {
          Service.del({ id: row._id }).then(
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 'new') {
            var d = Object.assign(this.ruleForm, { type: this.dicType })
            Service.add(d).then(
              res => {
                this.$message.success(' 创建成功')
                this.query()
                this.dialogVisible = false
              }
            )
          } else {
            Service.update({ id: this.ruleForm._id }, Object.assign(this.ruleForm, { type: this.dicType })).then(
              res => {
                this.$message.success('编辑成功')
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
.index-container{
  .top{
    display: flex;
    justify-content: start;
  }
}
</style>
