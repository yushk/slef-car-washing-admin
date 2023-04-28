<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px">
    <el-form-item label="帐号" prop="name">
      <el-input v-model.trim="ruleForm.name" disabled />
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model.trim="ruleForm.nickName" />
    </el-form-item>
    <el-form-item v-if="type==='info'" label="邮箱" prop="email">
      <el-input v-model.trim="ruleForm.email" />
    </el-form-item>
    <el-form-item v-if="type==='info'" label="电话" prop="phone">
      <el-input v-model.trim="ruleForm.phone" />
    </el-form-item>
    <el-form-item v-if="type==='ps'" label="原密码" prop="oldps">
      <el-input v-model="ruleForm.oldps" show-password auto-complete="new-password" />

    </el-form-item>
    <el-form-item v-if="type==='ps'" label="新密码" prop="ps">
      <el-input v-model="ruleForm.ps" show-password auto-complete="new-password" />
      <div class="intensity">
        <span class="psdText">密码强度</span>
        <span
          class="line"
          :class="[level.includes('low') ? 'low' : '']"
        />
        <span
          class="line"
          :class="[level.includes('middle') ? 'middle' : '']"
        />
        <span
          class="line"
          :class="[level.includes('high') ? 'high' : '']"
        />
        <div class="warningtext">
          密码应由6-16位数字、字母、符号组成。请不要使用容易被猜到的密码
        </div>
      </div>
    </el-form-item>
    <el-form-item v-if="type==='ps'" label="再次输入密码" prop="reps">
      <el-input v-model="ruleForm.reps" show-password />

    </el-form-item>
    <el-form-item v-if="type==='info'" label="角色" prop="role">
      <el-select v-model="ruleForm.role" disabled placeholder="请选择用户角色">
        <el-option v-for="(key,index) in rolesDic" :key="index" :label="key" :value="index" />

      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更 新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { UpdateUser, ModifyUserPassword } from '@/api/apis'
import { rolesDic } from '@/settings'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return { }
      }
    },
    type: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        phone: '',
        email: '',
        role: '',
        oldps: '',
        ps: '',
        reps: ''
      },
      level: [],
      rolesDic: rolesDic
    }
  },
  computed: {
    rules() {
      if (this.type === 'info') {
        return {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '11位手机号码', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ]
        }
      } else {
        return {
          oldps: [
            { required: true, message: '请输入原始密码', trigger: 'blur' }
          ],
          ps: [
            { required: true, validator: this.checkPassword, trigger: 'blur' }
          ],
          reps: [
            { required: true, validator: this.checkConfirmPassword, trigger: 'blur' }
          ]
        }
      }
    }
  },
  created() {
    this.ruleForm = Object.assign({ ps: '',
      reps: '' }, this.user)
  },
  methods: {
    submit() {
      const body = Object.assign({}, this.ruleForm)
      delete body.id

      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.type === 'info') {
            UpdateUser({ id: this.ruleForm.id, body }).then(
              res => {
                this.$message({
                  message: '更新成功',
                  type: 'success',
                  duration: 5 * 1000
                })
              }
            )
          } else {
            const obj = { username: this.ruleForm.name, old_password: this.ruleForm.oldps,
              new_password: this.ruleForm.ps }
            ModifyUserPassword(obj).then(
              async res => {
                await this.$store.dispatch('user/logout')
                this.$alert('密码修改成功', '', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                  }
                })
              }
            )
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 校验密码
    checkPassword(rule, value, callback) {
      this.level = []
      if (!value) {
        return callback('密码不能为空')
      }
      if (value.length < 6) {
        return callback('密码不少于6位')
      }
      if (value.length > 16) {
        return callback('密码不大于16位')
      }
      // 校验是数字
      const regex1 = /^\d+$/
      // 校验字母
      const regex2 = /^[A-Za-z]+$/
      // 校验符号
      const regex3 =
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/
      if (regex1.test(value)) {
        this.level.push('low')
      } else if (regex2.test(value)) {
        this.level.push('low')
      } else if (regex3.test(value)) {
        this.level.push('low')
      } else if (/^[A-Za-z\d]+$/.test(value)) {
        this.level.push('low')
        this.level.push('middle')
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\d]+$/.test(
          value
        )
      ) {
        this.level.push('low')
        this.level.push('middle')
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z]+$/.test(
          value
        )
      ) {
        this.level.push('low')
        this.level.push('middle')
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z\d]+$/.test(
          value
        )
      ) {
        this.level.push('low')
        this.level.push('middle')
        this.level.push('high')
      }
      return callback()
    },
    // 确认密码
    checkConfirmPassword(rule, value, callback) {
      if (!value) {
        return callback('请输入确认密码')
      }
      if (value !== this.ruleForm.ps) {
        return callback('两次密码输入不一致，请重新输入')
      }
      callback()
    }
  }
}
</script>
<style lang="scss" scoped>
.intensity {
  .psdText {
    font-size: 14px;
    margin-right: 10px;
  }
  .line {
    display: inline-block;
    width: 48px;
    height: 4px;
    background: #d8d8d8;
    border-radius: 3px;
    margin-right: 8px;
    &.low {
      background: #f4664a;
    }
    &.middle {
      background: #ffb700;
    }
    &.high {
      background: #2cbb79;
    }
  }
  .level {
    margin: 0 16px 0 8px;
  }
  .warningtext {
    color: #5a5a5a;
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>
