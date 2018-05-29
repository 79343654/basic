<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <!--登录-->
            <Card :bordered="false" v-show="cardShow==0">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con" >
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <div class="orther-control">
                                <span @click="cardShow=1">忘记密码？</span><span @click="cardShow=3">新用户注册</span>
                            </div>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                            <Checkbox v-model="autoLogin">自动登录</Checkbox>
                        </FormItem>
                    </Form>
                </div>
            </Card>
            <!--忘记密码-->
            <Card :bordered="false" v-show="cardShow==1">
                <p slot="title">
                    <Icon type="log-out"></Icon>
                    忘记密码
                    <span @click="cardShow=0" style="float: right;"><Icon type="arrow-left-c"></Icon></span>
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                  账号
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    验证码
                                </span>
                            <span slot="append">
                                    获取验证码
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>找回密码</Button>
                        </FormItem>
                    </Form>
                </div>

            </Card>
            <!--新用户注册-->
            <Card :bordered="false" v-show="cardShow==3">
                <p slot="title">
                    <Icon type="log-out"></Icon>
                    新用户注册
                    <span @click="cardShow=0" style="float: right;"><Icon type="arrow-left-c"></Icon></span>
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                  账号
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="text" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                       输入密码
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="text" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    再次输入密码
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    验证码
                                </span>
                            <span slot="append">
                                    获取验证码
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>注册</Button>
                        </FormItem>
                    </Form>
                </div>

            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            autoLogin:false,
            cardShow:0,
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    Cookies.set('user', this.form.userName);
                    this.$router.push({
                        name: 'home_index'
                    });
                }
            });
        }
    }
};
</script>

<style>

</style>
