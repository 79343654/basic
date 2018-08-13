<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keyup.enter="handleSubmit">
        <div class="login-con">
            <!--登录-->
            <Card :bordered="false" v-show="cardShow==0">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    {{lang.hydl}}
                </p>
                <div class="form-con" >
                    <Form ref="loginForm" :model="loginForm" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="loginForm.userName" :placeholder="lang.inAccountPhonePlaceHolder">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="loginForm.password" :placeholder="lang.inPasswordPlaceholder">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <div class="orther-control">
                                <span @click="goChangeCtrol(1)">{{lang.wjmm}}?</span><span @click="goChangeCtrol(2)">{{lang.xyhzc}}</span>
                            </div>
                        </FormItem>
                        <FormItem>
                            <Button @click="loginIn" type="primary" long>{{lang.dl}}</Button>
                            <Checkbox v-model="autoLogin">{{lang.zddl}}</Checkbox>
                            <span style="float: right;display: inline-block">
                                <ButtonGroup >
                                    <Button size="small" :type="language=='allForCn'?'primary':'dashed'" @click="changeLang('allForCn')">中文</Button>
                                    <Button size="small" :type="language=='allForEn'?'primary':'dashed'" @click="changeLang('allForEn')">English</Button>
                                </ButtonGroup>
                            </span>
                        </FormItem>
                    </Form>
                </div>
            </Card>
            <!--忘记密码-->
            <Card :bordered="false" v-if="cardShow==1">
                <p slot="title">
                    <Icon type="log-out"></Icon>
                    {{lang.wjmm}}
                    <span @click="cardShow=0" style="float: right;"><Icon type="arrow-left-c"></Icon></span>
                </p>
                <div class="form-con">
                    <Form ref="forgetForm" :model="forgetForm" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="forgetForm.userName" readonly :placeholder="lang.inAccountPlaceHolder">
                            </Input>
                        </FormItem>
                        <FormItem prop="userPhone">
                            <Input v-model="forgetForm.userPhone" readonly :maxlength="11" :placeholder="lang.inPhonePlaceHolder">
                            </Input>
                        </FormItem>
                        <FormItem prop="passwordf">
                            <Input type="text" v-model="forgetForm.passwordf" :placeholder="lang.inPasswordPlaceholder">
                            </Input>
                        </FormItem>
                        <FormItem prop="rePasswordf">
                            <Input type="text" v-model="forgetForm.rePasswordf" :placeholder="lang.inPasswordRPlaceholder">
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input type="password" :maxlength='5' v-model="forgetForm.verifyCode" :placeholder="lang.inCodePlaceHolder">
                                <span slot="append" id="v_container" style="cursor: pointer">
                                    <Button type="primary" size="small" @click="getCode('forgetForm')" :disabled="canNotGetCode">{{codeText}}</Button>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="findPsd" type="primary" long>{{lang.wjmm}}</Button>
                        </FormItem>
                    </Form>
                </div>

            </Card>
            <!--新用户注册-->
            <Card :bordered="false" v-if="cardShow==2">
                <p slot="title">
                    <Icon type="log-out"></Icon>
                    {{lang.xyhzc}}
                    <span @click="cardShow=0" style="float: right;"><Icon type="arrow-left-c"></Icon></span>
                </p>
                <div class="form-con">
                    <Form ref="registerForm" :model="registerForm" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="registerForm.userName" :placeholder="lang.inAccountPlaceHolder">
                            </Input>
                        </FormItem>
                        <FormItem prop="userPhone">
                            <Input v-model="registerForm.userPhone" :maxlength="11" :placeholder="lang.inPhonePlaceHolder">
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="text" v-model="registerForm.password" :placeholder="lang.inPasswordPlaceholder">
                            </Input>
                        </FormItem>
                        <FormItem prop="rePassword">
                            <Input type="text" v-model="registerForm.rePassword" :placeholder="lang.inPasswordRPlaceholder">
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input type="password" :maxlength='5' v-model="registerForm.verifyCode" :placeholder="lang.inCodePlaceHolder">
                            <span slot="append" id="v_container" style="cursor: pointer">
                                <Button type="primary" size="small" @click="getCodeR('registerForm')" :disabled="canNotGetCodeR">{{codeTextR}}</Button>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="registerAccount" type="primary" long>{{lang.zc}}</Button>
                        </FormItem>
                    </Form>
                </div>

            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import verifyCode from '../libs/verifyCode';
import {mapState, mapMutations,mapActions} from 'vuex';
export default {
    data () {
      const validateAccount = (rule, value, callback) => {
        var reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
        var reg1 = /^[a-zA-Z]+$/;
        var reg2 = /^[0-9]*$/;
        if (value === '') {
          callback(new Error('账号输入不能为空'));
        } else {
          if (reg.test(value)||reg1.test(value)||reg2.test(value)) {
            callback();
          }else{
            callback(new Error('账号可以为字母或数字或字母数字组成'));
          }
        }
      };
      const validatePhone = (rule, value, callback) => {
        var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (value === '') {
          callback(new Error('手机号码不能为空'));
        } else {
          if (reg.test(value)) {
            callback();
          }else{
            callback(new Error('手机号码输入不正确'));
          }
        }
      };

      const validatePsd = (rule, value, callback) => {
        var reg = /^[0-9a-zA-Z]{6,}$/;
        if (value === '') {
          callback(new Error('密码不能为空'));
        } else {
          if (reg.test(value)) {
            callback();
          }else{
            callback(new Error('密码为中英文组成，至少6位'));
          }
        }
      };

      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else {
          if (this.registerForm.password != value) {
            callback(new Error('两次密码输入不一致'));
          }else{
            callback();
          }

        }
      };
      const validatePassf = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else {
          if (this.forgetForm.passwordf != value) {
            callback(new Error('两次密码输入不一致'));
          }else{
            callback();
          }

        }
      };
      const validatCode = (rule, value, callback) => {
        var reg = /^[0-9]{6}$/;
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          if (reg.test(value)) {
            callback(new Error('验证码输入不正确'));
          }else{
            callback();
          }

        }
      };

        return {
          verifyCode:null,
          autoLogin:false,
          cardShow:0,
          loginForm: {
                userName: '',
                password: ''
            },
          forgetForm:{
            userName:'',
            userPhone:'',
            passwordf:'',
            rePasswordf:'',
            verifyCode:''
          },
          registerForm:{
            userName:'',
            userPhone:'',
            password:'',
            rePassword:'',
            verifyCode:''
          },
         rules: {
                userName: [
                    { validator: validateAccount, trigger: 'blur' }
                ],
                userPhone: [
                    { validator: validatePhone, trigger: 'blur' }
                  ],
                password: [
                    { validator: validatePsd, trigger: 'blur' }
                  ],
                rePassword: [
                     { validator: validatePass, trigger: 'blur' }
                   ],
                passwordf: [
                     { validator: validatePsd, trigger: 'blur' }
                   ],
                rePasswordf:[
                     { validator: validatePassf, trigger: 'blur' }
                   ],
                verifyCode: [
                    { validator: validatCode, trigger: 'blur' }
                ]
            },
          language:'allForCn',
          countdown:60,
          canNotGetCode:false,
          codeText:'获取验证码',
          countdownR:60,
          canNotGetCodeR:false,
          codeTextR:'获取验证码'
        };
    },
  mounted(){
        if(Cookies.get("language")){
          this.language = Cookies.get("language")
        };
      let user = Cookies.get('user');
        if(user){
            this.autoLogin = true;
            this.loginForm = JSON.parse(user);
        }else{
          this.autoLogin = false;
        }
      },
      computed: {
        lang(){
          return this.$store.state.lang.loginIn
        }
      },
    methods: {
      ...mapMutations(['setData']),
      ...mapActions(['changeLanguage']),
      changeLang(value){
        this.language = value;
        this.$store.dispatch("changeLanguage", value)
        Cookies.set('language', value);
      },
      settime() {
        const _this = this;
        if (this.countdown == 0) {
          this.canNotGetCode = false;
          this.codeText = '获取验证码';
          this.countdown = 0;
        } else {
          this.canNotGetCode = true;
          this.codeText =  this.countdown + 's后获取验证码';
          this.countdown--;
        };
        setTimeout(function() {
          _this.settime()
        },1000)
      },
      settimeR() {
        const _this = this;
        if (this.countdownR == 0) {
          this.canNotGetCodeR = false;
          this.codeTextR = '获取验证码';
          this.countdownR = 0;
        } else {
          this.canNotGetCodeR = true;
          this.codeTextR =  this.countdownR + 's后获取验证码';
          this.countdownR--;
        };
        setTimeout(function() {
          _this.settimeR()
        },1000)
      },
      //获取验证码
      getCodeR(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (!this.canNotGetCodeR) {
              this.settimeR()
            } else {
              return
            };
            let userId = this.$cookie.get('userId');
            let accessToken = this.$cookie.get('accessToken');
            let permissions = this.$cookie.get('permissions');
            let data = {
              phone: name=='registerForm'?this.registerForm.userPhone:this.forgetForm.userPhone,
              bizCode: 2,
              userId: userId,
              loginType: 2,
              accessToken: accessToken,
              permissions: permissions
            };
            this.$http({
              method: 'post',
              url: this.$util.ajaxUrl + "/public/sendVcode",
              data
            }, (res) => {
              if (res.data.code == 0) {
                this.$Message.success("验证码获取成功")
              } else {
                this.$Message.error(res.data.msg)
              }
            }, (erro) => {
              console.log(erro);
            })
          }
        })
      },
      //获取验证码
      getCode(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (!this.canNotGetCode) {
              this.settime()
            } else {
              return
            };
            let userId = this.$cookie.get('userId');
            let accessToken = this.$cookie.get('accessToken');
            let permissions = this.$cookie.get('permissions');
            let data = {
              phone: name=='registerForm'?this.registerForm.userPhone:this.forgetForm.userPhone,
              bizCode: 2,
              userId: userId,
              loginType: 2,
              accessToken: accessToken,
              permissions: permissions
            };
            this.$http({
              method: 'post',
              url: this.$util.ajaxUrl + "/public/sendVcode",
              data
            }, (res) => {
              if (res.data.code == 0) {
                this.$Message.success("验证码获取成功")
              } else {
                this.$Message.error(res.data.msg)
              }
            }, (erro) => {
              console.log(erro);
            })
          }
        })
      },
      /*提交enter*/
      handleSubmit(){
        if(this.cardShow == 0){
          this.loginIn()
        }else if(this.cardShow == 2){

            this.registerAccount()
        }else if(this.cardShow == 1){
          this.findPsd()
        }
      },
      /*改变操作面板*/
      goChangeCtrol(it){
        //cardShow为0登陆2为注册1为忘记密码
        if(it==1){
          if(this.loginForm.userName!=undefined&&this.loginForm.userName!=''){
            this.checkAccount()
          }else{
            this.$Message.error('请先输入用户名')
          }
        }else{
          this.cardShow = it
        }
      },
      //验证账户是否存在
      checkAccount(){
        let data = {
          account:this.loginForm.userName
        };
        this.$http({
          method:'post',
          url:this.$util.ajaxUrl+"/user/checkAccount",
          data
        },(res)=>{
          let result = res.data;
          if(result.code==0){
            this.cardShow = 1
            this.forgetForm.userName = result.data.account;
            this.forgetForm.userPhone = result.data.phone
          }else{
            this.$Message.error(res.data.msg)
          }
        },(erro)=>{
          console.log(erro);
        })
      },
      /*找回密码*/
      findPsd () {
        let data = {
          account:this.forgetForm.userName,
          phone:this.forgetForm.userPhone,
          pwd:this.forgetForm.passwordf,
          vcode:this.forgetForm.verifyCode,
          bizCode:2,
          systemVersion:'PC',
          loginType:2
        };
        this.$refs.forgetForm.validate((valid) => {
          if (valid) {
            if(this.forgetForm.verifyCode==''){
              this.$Message.error('请输入验证码！');
              return
            };
            this.$http({
              method:'post',
              url:this.$util.ajaxUrl+"/user/register",
              data
            },(res)=>{
              if(res.data.code==0){
                this.cardShow = 0;
                this.$Message.success("密码找回成功")
              }else{
                this.$Message.error(res.data.msg)
              }
            },(erro)=>{
              console.log(erro)
            })
          }
        });
      },
      /*注册*/
      registerAccount(){
        let data = {
          account:this.registerForm.userName,
          phone:this.registerForm.userPhone,
          pwd:this.registerForm.password,
          vcode:this.registerForm.verifyCode,
          bizCode:1,
          systemVersion:'PC',
          loginType:2
        };
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            if(this.registerForm.verifyCode==''){
              this.$Message.error('请输入验证码！');
              return
            };
            this.$http({
              method:'post',
              url:this.$util.ajaxUrl+"/user/register",
              data
            },(res)=>{
              if(res.data.code=='0'){
                this.$Message.success("注册成功");
              }else{
                this.$Message.error(res.data.msg);
              }
            },(erro)=>{
              console.log(erro)
            })

          }
        });
      },
      /*登陆*/
        loginIn () {
            let data = {
              account:this.loginForm.userName,
              pwd:this.loginForm.password,
              systemVersion:'PC',
              loginType:2
            };
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$http({
                        method:'post',
                        url:this.$util.ajaxUrl+"/user/login",
                        data
                    },(res)=>{
                      let result = res.data.data;
                      if(res.data.code=='0'){
                        if(this.autoLogin){
                          Cookies.set('user', this.loginForm);
                        }else{
                          Cookies.set('user', {});
                        };
                        this.$Message.success("登陆成功");
                        Cookies.set('accessToken', result.accessToken);
                        Cookies.set('permissions', result.permissions);
                        Cookies.set('companyName', result.name);
                        Cookies.set('userId', result.userId);
                        Cookies.set('account', result.account);
                        Cookies.set('msgNum', result.msgNum);
                        this.$router.replace({
                          name: 'home_index',
                          query:{
                            account:result.account,
                            msgNum:result.msgNum,
                            userId:result.userId,
                            permissions:result.permissions
                          }
                        });
                      }else{
                        this.$Message.error(res.data.msg);
                      }
                    },(erro)=>{
                      console.log(erro)
                    })

                }
            });
        }
    }
};
</script>

<style>

</style>
