<template>
  <div class="">
    <div class="flex flex-row space-x-4">
      <div class="flex-1 h-12 text-center bg-gray-100 ">我的课程</div>
      <div class="flex-1 h-12 text-center bg-gray-100 ">学生作业</div>
      <div class="flex-1 h-12 text-center bg-gray-100 ">评价邀请</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
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
  .dashboard {
    &-index-container {
      padding: 30px;
      height: 100%;
      width: 100%;
      // background: url('../../assets/wait.webp');
      background-size: 80% 80%;
      background-repeat: no-repeat;
      background-position: center center;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  </style>

