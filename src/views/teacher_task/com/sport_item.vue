<template>
  <div class="px-4">
    <el-form :inline="true" size="mini" :model="ruleForm" label-width="100px">
      <el-form-item label="运动类别" prop="sport_type" style="width:30%">
        <el-select
          v-model="ruleForm.sport_type"
          placeholder="请输选择运动类别"
          style="width:300px"
          disabled
        >
          <el-option
            v-for="item in sportTypeOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="教案标题" prop="lable" style="width:30%">
        <span>{{ ruleForm.lable }}</span>
      </el-form-item>
      <el-form-item label="版本" prop="version" style="width:30%">
        <span>{{ ruleForm.version }}</span>
      </el-form-item>
      <el-form-item label="教案文件" prop="files" style="width:30%">

        <a v-for="(itemlink,index) in ruleForm.files" :key="index+'link'" target="_blank" :href="itemlink.url">
          <el-button type="text" size="mini">{{ itemlink.name }}</el-button>
        </a>
      </el-form-item>
      <el-form-item label="教案视频" prop="videos" style="width:30%">
        <a v-for="(itemlink,index) in ruleForm.videos" :key="index+'videoll'" target="_blank" :href="itemlink.url">
          <el-button type="text" size="mini">{{ itemlink.name }}</el-button>
        </a>
      </el-form-item>
      <el-form-item label="责任人" prop="auth_user" style="width:30%">
        <el-select
          v-model="ruleForm.auth_user"
          multiple
          placeholder="请输入姓名"
          style="width:300px"
          disabled
        >
          <el-option
            v-for="item in useroptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="授课老师" prop="teacher" style="width:40%;">
        <el-select
          v-model="ruleForm.teachers"
          multiple
          placeholder="请输入姓名"
          style="width:300px"
          disabled
        >
          <el-option
            v-for="item in useroptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="评价准测" prop="Evaluates" style="width:100%;display: flex;">
        <table border="1" style="width:100%;position: relative;text-align: center;">
          <tr>
            <th class="border w80">{{ tablehead.name }}</th>
            <th class="border w80">{{ tablehead.excellent }}</th>
            <th class="border w80">{{ tablehead.good }}</th>
            <th class="border w80">{{ tablehead.pass }}</th>
            <th class="border w80">{{ tablehead.flunk }}</th>
          </tr>
          <tr v-for="(grade,index) in ruleForm.Evaluates " :key="index+'sdf'">
            <td class="w80">
              <span> {{ grade.name }}</span>
            </td>
            <td class="w80">
              <span>{{ grade.excellent }}   </span>
            </td>
            <td class="w80">
              <span>{{ grade.good }}   </span>
            </td>
            <td class="w80">

              <span>{{ grade.pass }}   </span>
            </td>
            <td class="w80">
              <span>{{ grade.flunk }}   </span>
            </td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item
        prop="content"
        label="说明"
        style="width:100%;display: flex;"
      >
        <el-input v-model="ruleForm.content" type="textarea" disabled :rows="4" placeholder="请填写备注说明" />
        <!-- <div style="border: 1px solid #ccc;width:100%">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :default-config="toolbarConfig"
            :mode="mode"
          />
          <Editor
            v-model="ruleForm.content"
            style="height: 250px; overflow-y: hidden;"
            :default-config="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          />
        </div> -->
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
import { GetUsers, GetSportTypes } from '@/api/apis'
export default {
  name: 'User',
  components: { },
  props: {
    ruleForm: {
      type: Object,
      default: () => {
        return {
          label: '',
          videos: [{
            url: 'http://47.98.59.56/userid/6295c0835ddfad7bae9acdc6c7f40c22.mp4',
            name: 'video1'
          },
          {
            url: 'http://47.98.59.56/userid/6295c0835ddfad7bae9acdc6c7f40c22.mp4',
            name: 'video2'
          }],
          files: [{
            url: 'http://47.98.59.56/userid/6295c0835ddfad7bae9acdc6c7f40c22.mp4',
            name: 'file1'
          }],
          content: '',
          html: '',
          auth_user: [],
          teacher: [],
          type: 2,
          sport_type: '',
          version: 'v1'
        }
      }
    }
  },
  data() {
    return {
      editor: null,
      toolbarConfig: { },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            customUpload: async(file, insertFn) => {
              this.uploadMedia(file, insertFn, 'img')
            }
          },
          uploadVideo: {
            customUpload: async(file, insertFn) => {
              this.uploadMedia(file, insertFn, 'img')
            }
          }
        }
      },
      useroptions: [],
      loading: {
        user: false,
        course: false
      },
      tablehead: {
        name: '动作',
        excellent: '优秀',
        good: '良好',
        pass: '及格',
        flunk: '不及格'
      },
      sportTypeOptions: [],
      mode: 'default' // or 'simple'
    }
  },
  created() {
    this.getSportType()
    this.remoteUser('')
  },
  mounted() {
  },
  methods: {
    // 获取运动类别
    getSportType() {
      var obj = {
        skip: 0,
        limit: 0,
        query: ''
      }
      GetSportTypes(obj).then(res => {
        const { items } = res
        this.sportTypeOptions = items
      })
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },

    remoteUser(query) {
      this.loading.user = true
      var obj = {
        skip: 0,
        limit: 0,
        query: JSON.stringify({ name: { '$regex': query }, '$or': [{ role: 'teacher' }] })
      }
      GetUsers(obj).then(res => {
        const { items } = res
        this.useroptions = items.map((e) => ({ label: e.name, value: e.id }))
        this.loading.user = false
      })
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>

  ::v-deep .el-form-item__content{
    flex:1 1 auto;
  }
</style>
