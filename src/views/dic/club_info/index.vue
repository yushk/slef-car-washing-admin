<template>
  <div class="index-container">
    <Table :table-key="tableKey" :table-data="tableData" :current-page="currentPage" :page-size="pageSize" :total="total" @changePage="query">
      <template #search>
        <el-input
          v-model="search"
          size="small"
          placeholder="输入关键字搜索"
          class="searchinput"
          @keyup.enter="query"
        />
        <el-button type="primary" size="small" @click="query">搜索</el-button>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from '@/components/Table'
import { GetPersonals } from '@/api/apis'
import { options } from '@/settings'
export default {
  name: 'ClubInfo',
  components: { Table },
  data() {
    return {
      tableKey: [
        { label: 'id', key: 'userid', width: 150 },
        { label: '法人姓名', key: 'name', width: 150 },
        { label: '俱乐部名称', key: 'club_name', width: 200 },
        { label: '区域', key: 'address', width: 200 },
        { label: '证件信息', key: 'files', type: 'link' }
      ],
      tableData: [],
      search: '',
      dialogVisible: false,
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      options: options
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    getAddress(List, value) {
      if (!value?.length > 0) {
        return ''
      }
      var i = 0
      var label = ''
      var find = (List, value) => {
        for (const item of List) {
          if (item.value === value[i]) {
            i++
            label += item.label
            if (item.children && item.children.length > 0 && value.length > i) {
              find(item.children, value)
            }
          }
        }
        return label
      }

      return find(List, value)
    },
    query() {
      var obj = {
        skip: this.pageSize * (this.currentPage - 1),
        limit: this.pageSize,
        query: JSON.stringify({ type: 'club' })
      }
      GetPersonals(obj).then(res => {
        const { items, total_count } = res
        this.tableData = items.map((e) => {
          return {
            ...e,
            address: this.getAddress(this.options, e.address.split('/'))
          }
        })
        this.total = total_count
      })
    },
    handleEdit(index, row) {
      this.type = 'edit'
      this.ruleForm = Object.assign({ repassword: '' }, row)
      this.ruleForm.password = ''
      this.dialogVisible = true
      console.log(index, row)
      console.log('this.ruleForm', this.ruleForm)
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('确认删除该用户？')
        .then(_ => {
        })
        .catch(_ => {})
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
