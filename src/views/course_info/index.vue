<template>
  <div class="index-container">
    <el-card style="height:calc( 100% - 50px);position: relative;overflow-y: auto;" class=" bg-[#eee]">
      <h2 slot="header" class="text-xl blod">{{ courseInfo.title }}</h2>
      <!-- <SportItem :rule-form="sportItem" /> -->
      <h2 class="text-xl blod"> 课件：</h2>

      <a v-for="(itemlink,index) in courseInfo.sport_item.files" :key="index+'link'" target="_blank" :href="itemlink.url">
        <el-button class="text-xl underline" type="text" size="mini">{{ itemlink.name }}</el-button>
      </a>
      <h2 class="text-xl blod">视频：</h2>

      <div class="flex flex-row space-x-4">
        <div v-for="(itemlink,index) in courseInfo.sport_item.videos" :key="index+'videoll'">
          <video class="w-full" controls :src="itemlink.url" style="width:400px" />
        </div>
      </div>
      <h2 class="text-xl blod">信息</h2>
      <div v-html="courseInfo.desc" />
    </el-card>

  </div>
</template>

<script>
import { GetHomeWork } from '@/api/apis'
export default {
  name: 'Course',
  components: { },
  data() {
    return {
      courseid: '',
      workid: '',
      courseInfo: {},
      sportItem: {}
    }
  },
  created() {
    console.log('params', this.$route.params)
    const { courseid, workid } = this.$route.params
    this.courseid = courseid
    this.workid = workid
    console.log('workid', workid)
  },
  mounted() {
    this.query()
  },
  methods: {
    query() {
      var obj = {
        id: this.courseid
      }
      GetHomeWork(obj).then(res => {
        this.courseInfo = res
        this.sportItem = res.sport_item
        console.log('this.courseInfo', this.courseInfo)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container{
  height: 100%;
  position: relative;
  overflow: auto;
  width:100%;
  padding: 10px 20px;
}
</style>
