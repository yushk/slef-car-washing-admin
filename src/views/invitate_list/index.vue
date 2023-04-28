<template>
  <div class="index-container">
    <Table :table-key="tableKey" :table-data="tableData" :current-page="currentPage" :page-size="pageSize" :total="total" @changePage="changePage">
      <template #search>
        <div class="flex items-center top">
          &nbsp;俱乐部：&nbsp;
          <el-select
            v-model="search.student_id"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入"
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
          :width="200"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              :disabled="scope.row.status!=='2'"
              @click="handleEdit(scope.row)"
            >查看</el-button>
            <el-button
              size="mini"
              type="success"
              :disabled="scope.row.status!=='2'"
              @click="download(scope.row)"
            >导出zip</el-button>
          </template>
        </el-table-column>
      </template>
    </Table>

  </div>
</template>

<script>
import { GetHomeWorks, GetUsers, GetClubFileZipURL } from '@/api/apis'
import { parseTime } from '@/utils/index'
import Table from '@/components/Table'
export default {
  name: 'User',
  components: { Table
    // UploadImage
  },
  data() {
    return {
      tableData: [],
      tableKey: [
        { label: '排序', key: 'statusT', type: 'tag' },
        { label: '俱乐部姓名', key: 'club_name' },
        { label: '完成情况', key: 'statusT', type: 'tag' },
        { label: '评级', key: 'statusT', type: 'tag' },
        { label: '创建时间', key: 'create', parse: 1, type: 'time', Func: parseTime, width: 120 },
        { label: '更新时间', key: 'update', parse: 1, type: 'time', Func: parseTime, width: 120 }
      ],
      search: { title: [], userid: [] },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      useroptions: [],
      loading: {
        user: false,
        course: false
      }
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
      this.loading.course = true
      var obj = {
        skip: 0,
        limit: 10,
        query: JSON.stringify({ })
      }
      // 管理员可以查看全部
      if (this.roles.includes('root')) {
        obj.query = ''
      }
      GetHomeWorks(obj).then(res => {
        const { items } = res
        console.log('items:', items)
        this.tableData = items.map((e) => {
          return {
            ...e,
            statusT: [{
              type: e.status === '0' ? 'warning' : e.status === '1' ? 'primary' : 'success',
              name: e.status === '0' ? '填报中' : e.status === '1' ? '审批中' : '审批完成'
            }
            ]
          }
        })
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
    handleEdit(row) {
      this.$router.push({ path: '/application_review/detail', query: { id: row.id }})
    },
    download(e) {
      window.open(GetClubFileZipURL({ club: e.club_name }))
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
