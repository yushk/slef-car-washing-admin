<template>
  <div class="app-container">
    <div v-if="userinfo">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="userinfo" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>Account</span>
            </div>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人信息" name="timeline">
                <account key="account001" :user="userinfo" type="info" />
              </el-tab-pane>
              <el-tab-pane label="登录密码" name="account">
                <account key="account002" :user="userinfo" type="ps" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard,
    Account },
  data() {
    return {
      activeTab: 'timeline'
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.userinfo = Object.assign({
        avatar: this.avatar
      }, this.user)
    }
  }
}
</script>
