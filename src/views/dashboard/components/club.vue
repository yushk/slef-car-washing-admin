<template>
  <div class="">
    <div class="flex flex-row space-x-4">
      <el-card class="w-2/3" :body-style="{padding:0}">
        <div slot="header" class="clearfix">
          <span>我的申请</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="openFill">填写申请</el-button>
        </div>
        <div v-if="applyList.length===0" class="text-center">
          <span class="text-xl">暂无申请</span>
          <el-button @click="openFill">填写申请</el-button>
        </div>
        <div class="relative flex flex-row flex-wrap w-full cursor-pointer">
          <el-card v-for="item in applyList" :key="item.id" class="w-1/2" shadow="hover">
            <div @click="$router.push({path:'/fill_apply',query:{id:item.id}})">
              <div class="text-xl">
                {{ item.club_name }}<br>
              </div>
              <div class="mt-2">自评成绩:{{ item.apply_items.reduce((accumulator, currentValue) => accumulator + Number(currentValue.value),0) }}</div>
              <div class="mt-2">最终成绩:{{ item.apply_items.reduce((accumulator, currentValue) => accumulator + Number(currentValue.reviewValue),0) }}</div>
              <div class="flex items-center justify-between mt-2 text-sm text-gray-600">
                <div class="p-2 text-white rounded-lg" :class="item.status==='0'?'bg-yellow-500':item.status==='1'?'bg-blue-500':'bg-green-500'">
                  {{ item.status==='0'?'填报中':item.status==='1'?'已提交':'审批完成' }}
                </div>
                <div>
                  更新时间{{ formatTime(item.update) }}
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-card>
      <el-card class="w-1/3">
        <div slot="header" class="clearfix">
          <span>俱乐部信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="openInfo">设置</el-button>
        </div>
        <div>
          法人：{{ userInfo.name }}
        </div>
        <div>
          证件信息：{{ userInfo.name }}
        </div>
        <div>
          俱乐部名称：{{ userInfo.club_name }}
        </div>
      </el-card>
    </div>
    <el-dialog
      :visible.sync="uploadInfoVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
      title="完善信息"
    >
      <div class="flex justify-center">
        <UploadInfo ref="uploadInfo" @close="uploadInfoVisible=false;getUserInfo()" />
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadInfo from './uploadInfo.vue'
import { GetPersonal, CreatePersonal, GetHomeWorks } from '@/api/apis'
import { formatTime } from '@/utils'
export default {
  name: 'Club',
  components: {
    UploadInfo
  },
  data() {
    return {
      userInfo: {},
      uploadInfoVisible: false,
      applyList: [],
      formatTime
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'user'
    ])
  },
  mounted() {
    this.getUserInfo()
    this.getApplyList()
  },
  methods: {
    openFill() {
      for (const item of this.applyList) {
        if (item.status === '0') {
          this.$confirm('已经存在填写中的申请，不允许重复参加')
          return
        }
      }
      this.$router.push({ path: '/fill_apply' })
    },
    openInfo() {
      this.uploadInfoVisible = true
      this.$nextTick(() => {
        this.$refs.uploadInfo.ruleForm = Object.assign(this.userInfo, { address: this.userInfo.address.split('/') })
        console.log(this.$refs.uploadInfo.ruleForm)
      })
    },
    getUserInfo() {
      GetPersonal({ id: this.user.id }).then(res => {
        if (res.error) {
          this.uploadInfoVisible = true
        } else {
          this.userInfo = res
          this.$store.dispatch('user/setClubInfo', res)
        }
      })
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          CreatePersonal({ body: this.ruleForm }).then(
            res => {
              this.$message({
                message: '更新成功',
                type: 'success',
                duration: 5 * 1000
              })
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getApplyList() {
      const obj = {
        skip: 0,
        limit: 0,
        query: JSON.stringify({ apply_user_id: this.userid })
      }
      GetHomeWorks(obj).then(res => {
        const { items } = res
        this.applyList = items
      })
    }

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

