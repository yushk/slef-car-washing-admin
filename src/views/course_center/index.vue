<template>
  <div class="index-container">
    <el-card>
      <div class="top">
        <el-input
          v-model="search.title"
          size="small"
          placeholder="输入关键字搜索"
          class="searchinput"
          clearable
        />
        <el-button type="primary" size="small" @click="query">搜索</el-button>
        <!-- <el-button type="success" size="small" @click="dialogVisible = true; type='new'">新建</el-button> -->
      </div>
      <el-divider />

      <el-row class="content ">
        <div v-if="tableData.length===0" class="u-flex-xy-center">
          暂无课程
        </div>
        <el-col v-for="(item,index) in tableData " v-else :key="index" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 6}" class="item">
          <el-card class="item_c">
            <div class="mb-2 text-xl truncate blod">{{ item.title }}</div>
            <el-divider />
            <video v-for="(vi,inv) in item.sport_item.videos" :key="inv" :src="vi.url" controls class="w-full" />
            <div class="mt-4 u-flex u-flex-end">
              <el-button type="primary" size="small" @click="join(item)">立即参加</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="changePage"
      />
    </el-card>
  </div>
</template>

<script>
import { CreateSolution, GetHomeWorks, GetSolutions } from '@/api/apis'
export default {
  name: 'User',
  data() {
    return {
      tableData: [],
      search: {
        title: ''
      },
      dialogVisible: false,
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
    changePage(v) {
      this.currentPage = v
      this.query()
    },
    async query() {
      var obj = {
        currentpage: this.currentPage,
        perpage: this.pageSize,
        query: JSON.stringify({ title: { $regex: this.search.title }})
      }
      //
      GetHomeWorks(obj).then(res => {
        const { items, total_count } = res
        this.tableData = items
        console.log('data:', items)
        this.total = total_count
      })
    },
    async join(e) {
      var objwork = {
        skip: 0,
        limit: 0,
        query: JSON.stringify({ student_id: this.$store.state.user.userid, work_id: e.id })
      }
      const { items } = await GetSolutions(objwork)
      if (items && items.length) {
        this.$message.warning('已经参加该课程')
        return
      }

      this.$confirm('确认立即参加？')
        .then(_ => {
          const obj = {
            student_id: this.$store.state.user.userid,
            work_id: e.id,
            student_name: this.$store.state.user.name,
            title: e.title,
            teachers: Array.from(new Set([...e.sport_item.auth_user, ...e.sport_item.auth_user, e.teacher]))
          }
          CreateSolution({ body: obj }).then(res => {
            this.$message.success('报名成功')
            this.$router.push('/my_course')
            this.query()
          })
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
  .content{
    height: 70vh;
    .item{
      .item_c{
        margin:10px;
        padding:10px;

      }
    }

  }
}
</style>
