<template>
  <div class="">
    <div class="flex flex-row space-x-4">
      <el-card class="flex-1">
        <div slot="header">教案
        </div>
        <div class="flex-1 h-12 text-center bg-gray-100 ">
          <item
            v-for="(item,index) in tableData"
            :key="index"
            :time="'time'"
            :title="'xx'"
          >
            <template #content>
              xxx
            </template>
          </item>
        </div>
      </el-card>
      <el-card class="flex-1">
        <div slot="header">课程
        </div>
        <div class="flex-1 h-12 text-center bg-gray-100 ">老师课程</div>
      </el-card>
      <el-card class="flex-1">
        <div slot="header">学生作业
        </div>
        <div class="flex-1 h-12 text-center bg-gray-100 ">教案</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    console.log('dashboard')
  }
}
</script>

  <style lang="scss" scoped>

  </style>

