<template>
  <div class="dashboard-index-container">
    <!-- <div class="dashboard-text">统计信息带开发</div> -->
    <Admin v-if="roles.includes('root')" />
    <Teacher v-if="roles.includes('teacher')" />
    <Student v-if="roles.includes('student')" />
    <Sport v-if="roles.includes('sport')" />
    <Club v-if="roles.includes('club')" />
  </div>
</template>

<script>
import Admin from './components/admin.vue'
import Student from './components/student.vue'
import Teacher from './components/teacher.vue'
import Sport from './components/sport.vue'
import Club from './components/club.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Admin,
    Student,
    Teacher,
    Sport,
    Club
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
