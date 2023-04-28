<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
    <el-form-item v-if="parentList.length>0" label="父级" prop="parent_id">
      <el-select
        v-model="ruleForm.parent_id"
        placeholder="请输选择一级指标"
        filterable
        allow-create
        style="width:300px"
      >
        <el-option
          v-for="item in parentList"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="名称" prop="label">
      <el-input v-model="ruleForm.label" />
    </el-form-item>

    <!-- <el-form-item label="编码" prop="code">
      <el-input v-model="ruleForm.code" />
    </el-form-item> -->
    <span class="flex justify-end dialog-footer">
      <el-button type="primary" :loading="isLoading" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-form>
</template>
<script>
import { CreateSportType, UpdateSportType } from '@/api/apis'
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    parentList: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      ruleForm: {
        label: '',
        level: '',
        parent_id: '',
        code: ''
      },
      rules: {
        label: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
        // code: [
        //   { required: true, message: '请输入编码', trigger: 'blur' }
        // ]
      },
      isLoading: false
    }
  },
  watch: {
    data: {
      deep: true,
      handler(v) {
        this.ruleForm = Object.assign({}, v)
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    clear() {
      this.ruleForm = {
        label: '',
        code: '',
        level: '',
        parent_id: ''
      }
    },
    submitForm(formName) {
      this.ruleForm.level = this.$route.name
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 'new') {
            CreateSportType({ body: this.ruleForm }).then(
              res => {
                this.$message.success('创建成功')
                this.clear()
                this.isLoading = false
                this.$emit('close')
              }
            )
          } else {
            const body = Object.assign({}, this.ruleForm)
            delete body.id
            UpdateSportType({ id: this.ruleForm.id, body }, this.ruleForm).then(
              res => {
                this.$message.success('编辑成功')
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
