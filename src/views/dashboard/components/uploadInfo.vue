<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
    <el-form-item label="法人姓名" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="俱乐部名称" prop="club_name">
      <el-input v-model="ruleForm.club_name" />
    </el-form-item>
    <el-form-item label="所属区域" prop="address">
      <el-cascader
        v-model="ruleForm.address"
        :options="options"
        :props="{ checkStrictly: true }"
        clearable
      />
    </el-form-item>
    <el-form-item label="证件" prop="files">
      <UploadImage
        class="ml-8"
        :limit-type="['.pdf']"
        :limit="9"
        :img-list="ruleForm.files"
        button-label="点击上传证件"
        @onSuccessFiles="onSuccessFiles"
      />
    </el-form-item>
    <span class="flex justify-end dialog-footer">
      <el-button type="primary" :loading="isLoading" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-form>
</template>
<script>
import { CreatePersonal, UpdatePersonal } from '@/api/apis'
import { options } from '@/settings'
import UploadImage from '@/components/uploadCom'
const info = {
  name: '',
  address: '',
  type: 'club',
  club_name: '',
  files: []
}
export default {
  components: { UploadImage },
  props: {

  },
  data() {
    return {
      options: options,
      ruleForm: Object.assign({}, info),
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        club_name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请设置所属区', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    onSuccessFiles() {},
    clear() {
      this.ruleForm = Object.assign({}, info)
    },
    submitForm(formName) {
      this.ruleForm.type = 'club'
      this.ruleForm.userid = this.$store.state.user.userid
      this.ruleForm.address = this.ruleForm.address.join('/')
      console.log(this.ruleForm)
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.ruleForm.id) {
            CreatePersonal({ body: this.ruleForm }).then(
              res => {
                this.$message.success('设置成功')
                this.clear()
                this.isLoading = false
                this.$emit('close')
              }
            )
          } else {
            const o = Object.assign({}, this.ruleForm)
            delete o.id
            UpdatePersonal({ body: o, id: this.ruleForm.id }).then(
              res => {
                this.$message.success('设置成功')
                this.clear()
                this.isLoading = false
                this.$emit('close')
              }
            )
          }
        } else {
          console.log('error submit!!')
          this.isLoading = false
          return false
        }
      })
    }
  }
}
</script>

