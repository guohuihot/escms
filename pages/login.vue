<template>
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="100px"
        class="form"
    >
        <el-form-item
            label="用户名"
            prop="username"
        >
            <el-input
                v-model="ruleForm.username"
                type="text"
                autocomplete="off"
            />
        </el-form-item>
        <el-form-item
            label="密码"
            prop="password"
        >
            <el-input
                v-model="ruleForm.password"
                type="password"
                autocomplete="off"
            />
        </el-form-item>
        <el-form-item
            label="验证码"
            prop="captcha"
        >
            <el-input
                v-model="ruleForm.captcha"
                type="text"
                autocomplete="off"
            >
                <template #suffix>
                    <es-captcha
                        :width="100"
                        :height="36"
                        style="margin-top: 2px;"
                    />
                </template>
            </el-input>
        </el-form-item>

        <el-form-item>
            <el-button
                type="primary"
                @click="submitForm('ruleForm')"
            >
                提交
            </el-button>
        </el-form-item>
        <el-form-item>
            <el-row :gutter="0">
                <el-col :span="12">
                    <nuxt-link :to="{ path: '/reset-password' }">
                        忘记密码
                    </nuxt-link>
                </el-col>
                <el-col
                    :span="12"
                    class="text-right"
                >
                    <nuxt-link :to="{ path: '/register' }">
                        新用户
                    </nuxt-link>
                </el-col>
            </el-row>
        </el-form-item>
    </el-form>
</template>

<script>
import EsCaptcha from '@/components/EsCaptcha'
import { Message } from 'element-ui'

export default {
    components: {
        EsCaptcha
    },
    data() {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass')
                }
                callback()
            }
        }
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            ruleForm: {
                username: '',
                password: '',
                captcha: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, validator: validatePass, trigger: 'blur' }],
                captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                checkPass: [{ validator: validatePass2, trigger: 'blur' }],
            }
        }
    },
    beforeMount() {
        if (localStorage.getItem('token')) {
            this.goAdmin()
        }
    },
    methods: {
        async submitForm(formName) {
            let valid = await this.$refs[formName].validate()
            if (valid) {
                let res = await this.$axios({
                    url: '/api/login',
                    method: 'post',
                    data: this.ruleForm
                })
                if (res.code == 1) {
                    localStorage.setItem('token', res.data.token)
                    this.goAdmin()
                }
            }
        },
        // 跳转到后台
        goAdmin() {
            this.$router.push({
                path: '/admin/desk'
            })
        }
    }
}
</script>

<style scoped lang="scss">
.form {
    width: 400px;
    margin: 30vh auto 0;
    a {
        color: #666;
        &:hover {
            color: #ffd04b;
        }
    }
}
</style>
