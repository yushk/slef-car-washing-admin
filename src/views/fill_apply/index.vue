<template>
  <div class="m-4 index-container">
    <!-- 一级指标 -->
    <el-steps :active="current" align-center>
      <el-step v-for="item in applyForm" :key="item.id" :title="item.title" :description="item.score+''" />
    </el-steps>
    <!-- 二级指标 -->
    <div id="show" class="relative flex flex-row flex-wrap " :class="ruleForm.status === '1'?'cursor-not-allowed':'cursor-pointer'">
      <yx-water-mark
        :content="ruleForm.status === '1' ? '审批中' : '申请中'"
        :is-mark="ruleForm.status ==='1'"
        opacity="0.15"
      />
      <el-card
        v-for="(second,i2) in applyForm[current].seconds"
        :key="second.id"
        class="w-full mt-2 ml-12 "
      >
        <div class="text-base">{{ i2+1 }} {{ second.title }}{{ second.score }}</div>
        <!-- 三级指标 -->
        <div v-for="(q,i3) in second.questions" :key="q.id" class="mt-2 ml-4">
          <div class="flex flex-row ">
            <div class="relative w-2/3">
              <div class="text-base">{{ i2+1 }}.{{ i3+1 }} {{ q.label }}</div>
              <el-radio-group v-model="applyObj[q.id].value" class="flex flex-col ml-4">
                <el-radio
                  v-for="an in q.questionOptions"
                  :key="an.id"
                  class="text-base"
                  :label="an.score"
                >({{ an.score }}) {{ an.desc }}</el-radio>
              </el-radio-group>
            </div>
            <div class="w-1/3">
              <UploadImage
                v-if="q.uploadFile==='1'"
                :key="q.id+'uploadFile'"
                :path="clubName+`/${applyForm[current].title}/${second.title}`"
                class="ml-8"
                :limit-type="[q.fileType]"
                :limit="9"
                :img-list="applyObj[q.id].files||[]"
                :button-label="'上传'+q.fileName"
                @onSuccessFiles="(e)=>(applyObj[q.id].files=e)"
              />
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="flex justify-center mt-2">
      <el-button v-show="!(current==0)" type="primary" @click="current--">上一步</el-button>
      <el-button v-show="!(current==applyForm.length-1)" type="primary" @click="current++">下一步</el-button>
      <el-button v-if="ruleForm.status ==='0'" type="warning" @click="submitForm('0')">保存</el-button>
      <!-- <el-button type="warning" @click="submitForm('0')">保存</el-button> -->
      <el-button v-if="ruleForm.status ==='0'" type="success" @click="submitForm('1')">提交</el-button>
      <!-- <el-button type="success" @click="submitForm('1')">提交</el-button> -->
    </div>
  </div>
</template>

<script>
import { CreateHomeWork, GetHomeWork, UpdateHomeWork, GetSportItems, GetSportTypes } from '@/api/apis'
import UploadImage from '@/components/uploadCom/index.vue'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'FillApply',
  components: { UploadImage },
  data() {
    return {
      radio: 3,
      applyForm: [{}],
      ruleForm: {
        apply_user_id: '',
        apply_items: [],
        club_name: '',
        status: '0'
      },
      applyObj: {},
      current: 0,
      oss: null,
      type: 'new',
      sportItemOptions: [],
      alluseroptions: [],
      sportTypeOptions: []
    }
  },
  computed: {
    clubName() {
      return this.$store.state.user.clubInfo?.club_name
    }
  },
  async mounted() {
    await this.getSportType()
    this.getSportItem()
    this.type = 'new'
    if (this.$route.query.id) {
      this.type = 'edit'
      this.getApplyInfo(this.$route.query.id)
    }
  },
  beforeDestroy() {
  },
  methods: {
    getApplyInfo(id) {
      GetHomeWork({ id: id }).then(res => {
        if (res) {
          console.log('res', res)
          this.ruleForm = res
          res.apply_items.forEach((e) => {
            this.$set(this.applyObj, e.templateid, e)
          })
        }
      })
    },

    onSuccessFiles(files) {},
    // 获取一级二级指标
    async getSportType() {
      var obj = {
        skip: 0,
        limit: 0,
        query: ''
      }
      const { items } = await GetSportTypes(obj)
      this.sportTypeOptions = items
    },
    // 获取申请模板配置信息
    getSportItem(q) {
      var obj = {
        skip: 0,
        limit: 0,
        query: JSON.stringify({})
      }
      GetSportItems(obj).then(res => {
        const { items } = res
        this.sportItemOptions = items.map((e) => {
          return {
            ...e,
            questionOptions: e.questionOptions.map((q) => ({ ...q, id: uuidv4() }))
          }
        })
        this.generateTemplate(this.sportItemOptions)
      })
    },
    generateTemplate(data) {
      this.applyForm = []
      if (data.length === 0) return
      const firstObj = {}
      data.forEach(e => {
        if (this.applyObj[e.id] === undefined) {
          this.$set(this.applyObj, e.id, {
            value: '',
            files: [],
            templateid: e.id
          })
        }
        if (firstObj[e.first ]) {
          firstObj[e.first ].push(e)
        } else {
          firstObj[e.first ] = [e]
        }
      })

      for (const key in firstObj) {
        const seconds = {}
        for (const item of firstObj[key]) {
          if (seconds[item.second ]) {
            seconds[item.second ].push(item)
          } else {
            seconds[item.second ] = [item]
          }
        }
        const secondsList = []
        for (const keys in seconds) {
          secondsList.push({
            id: keys,
            title: this.sportTypeOptions.find(e => (e.id === keys)).label || '',
            score: 0,
            questions: seconds[keys].map((e) => ({ ...e, value: '', files: [] }))
          })
        }
        this.applyForm.push({ id: key, title: this.sportTypeOptions.find(e => (e.id === key)).label || '', score: 0, seconds: secondsList })
      }
      console.log('this.applyForm', this.applyForm)
    },
    submitForm(type) {
      this.ruleForm.status = type
      this.ruleForm.apply_user_id = this.$store.state.user?.userid
      this.ruleForm.club_name = this.$store.state.user.clubInfo?.club_name
      this.ruleForm.apply_items = Object.values(this.applyObj)
      for (const im of this.ruleForm.apply_items) {
        if (im.score === '' && type === '1') {
          this.$message('xxx 未填报，请继续填报')
          return
        }
      }
      const obj = Object.assign({}, this.ruleForm)
      delete obj.id
      if (this.type === 'new') {
        CreateHomeWork({ body: obj }).then(
          res => {
            this.$router.push({ path: '/success' })
          }
        )
      } else {
        UpdateHomeWork({ id: this.$route.query.id, body: obj }).then(
          res => {
            this.$router.push({ path: '/success' })
          }
        )
      }
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
  #show{
    position: relative;
    z-index: 99;
    overflow: hidden;
  }
}
</style>
