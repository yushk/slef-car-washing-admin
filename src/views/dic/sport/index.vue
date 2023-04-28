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

        <el-input v-model="search" size="small" placeholder="输入关键字搜索" class="searchinput" @keyup.enter.native="query" />
        <el-button type="primary" size="small" @click="query">搜索</el-button>
        <el-button type="success" size="small" @click="create">新建</el-button>
      </template>
      <template #operate>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </Table>
    <el-drawer :title="type === 'new' ? '新建' : '编辑'" :visible.sync="dialogVisible" width="40%">
      <AddDic v-if="dialogVisible" :key="$route.name" :type="type" :parent-list="parentList" :data="ruleForm" @close="dialogVisible=false;query()" />
    </el-drawer>
  </div>
</template>

<script>
import { GetSportTypes, DeleteSportType } from '@/api/apis'
import Table from '@/components/Table'
import AddDic from '@/components/AddDic'
export default {
  name: 'Dic',
  components: {
    Table, AddDic
  },
  data() {
    return {
      tableData: [],
      tableKey: [
        { label: '名称', key: 'label' },
        { label: '一级指标名称', key: 'parent' }
      ],
      search: '',
      dialogVisible: false,
      ruleForm: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      type: 'new',
      parentList: []
    }
  },
  mounted() {
    if (this.$route.name === 'first') {
      this.tableKey.splice(1, 1)
    }
    this.query()
  },
  methods: {
    create() {
      this.ruleForm = null
      this.type = 'new'
      this.dialogVisible = true
    },
    changePage(index) {
      this.currentPage = index
      this.query()
    },
    query() {
      var obj = {
        skip: 0,
        limit: 0,
        query: JSON.stringify({
          label: {
            '$regex': this.search
          }
        })
      }
      GetSportTypes(obj).then(res => {
        const { items } = res
        if (this.$route.name === 'second') {
          this.parentList = items.filter((e) => (e.level === 'first'))
          this.tableData = items.filter((e) => (e.level === this.$route.name)).map((e) => {
            return {
              ...e,
              parent: this.parentList.find((p) => (p.id === e.parent_id)).label
            }
          })
        } else {
          this.tableData = items.filter((e) => (e.level === this.$route.name))
        }
      })
    },
    handleEdit(index, row) {
      this.type = 'edit'
      this.ruleForm = Object.assign({}, row)
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('删除后不可恢复，确认删除？')
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
