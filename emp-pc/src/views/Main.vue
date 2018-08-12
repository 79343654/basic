<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <Modal v-model="changePsd" title="更改密码" :mask-closable="false" >
            <Form ref="changeLoginForm" :model="changeLoginForm" :rules="ruleInline" >
                <FormItem prop="oldPsd">
                    <Input type="text" v-model="changeLoginForm.oldPsd" placeholder="请输入旧密码"></Input>
                </FormItem>
                <FormItem prop="newPsd">
                    <Input type="password" v-model="changeLoginForm.newPsd" placeholder="请输入新密码"></Input>
                </FormItem>
                <FormItem prop="newPsdf">
                    <Input type="password" v-model="changeLoginForm.newPsdf" placeholder="请输入新密码"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" long @click="changeThePsd('changeLoginForm')">确认</Button>
            </div>
        </Modal>
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu :language = 'language'
                :shrink="shrink"
                     ref="sideMenu"
                             :activeName="activeName"
                :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <span>{{lang.systemName}}</span>
                    <!--<img v-show="!shrink"  src="../images/logo.jpg" key="max-logo" />-->
                    <!--<img v-show="shrink" src="../images/logo-min.jpg" key="min-logo" />-->
                </div>
            </shrinkable-menu>
        </div>
        <div class="right-section">
            <div class="main-header-con">
                <div class="main-header">
                    <div class="navicon-con">
                        <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                            <Icon type="navicon" size="32"></Icon>
                        </Button>
                        <Button type="primary" v-if="permissions==1" @click="chooseUser=true">选中用户</Button>
                        <span  v-if="permissions==1">{{choosedUserInfo.name}}</span>
                        <span>{{companyName}}</span>
                    </div>
                    <div class="header-avator-con">
                        <div class="user-dropdown-menu-con">
                            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                                <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                    <a href="javascript:void(0)">
                                        <span class="main-user-name">{{ userName }}</span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="reset" divided >{{lang.resetPsd}}</DropdownItem>
                                    </DropdownMenu>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="loginout" @click="loginOut" divided>{{lang.loginOut}}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Avatar icon="person" style="background: #619fe7;margin-left:10px;"></Avatar>
                            </Row>
                        </div>
                    </div>
                    <div class="note-num">
                        {{lang.noteNum}}：{{msgNum}}
                    </div>
                    <div class="note-num">
                        <ButtonGroup>
                            <Button :type="language=='allForCn'?'primary':'dashed'" @click="changeLang('allForCn')">中文</Button>
                            <Button :type="language=='allForEn'?'primary':'dashed'" @click="changeLang('allForEn')">English</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
                <div class="single-page">
                    <router-view :language="language"></router-view>
                </div>
            </div>
        </div>
        <Modal v-model="chooseUser"  title="用户列表">
            <div>
                <div style="margin-bottom: 10px;">
                    <Input v-model="searchTxt" placeholder="输入设备名称." style="width: 300px" />
                    <Button  type="primary" @click="searchList(0)">搜索</Button>
                </div>
                <Table highlight-row border :columns="columnsUser" :data="userData"></Table>
            </div>
            <div style="margin-top: 10px;">
                <Page :total="totalPage" :page-size="pageSize" :current="currentPage+1" @on-change="changePage"/>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
import {mapActions,mapState} from "vuex";
export default {
    components: {
        shrinkableMenu
    },
    data () {
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
      const validatePassf = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else {
          if (this.changeLoginForm.newPsd != value) {
            callback(new Error('两次密码输入不一致'));
          }else{
            callback();
          }
        }
      };
        return {
          choosedUserInfo:{
            userId:'',
            name:''
          },
          companyName:'',
          chooseUser:false,
          totalPage:0,
          pageSize:10,
          searchTxt:'',
          currentPage:0,
          userData:[],
          columnsUser:[
            {
              title: '账号',
              align:'center',
              key: 'account'
            },
            {
              title: '名称',
              key: 'name',
              align:'center'
            },
            {
              title: '选择用户',
              key: 'action',
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {type: 'text', size: 'small'},
                    style: {
                      color: '#2d8cf0'
                    },
                    on: {
                      click: () => {
                        Cookies.set('userId',params.row.userId);
                        this.choosedUserInfo = {
                          userId:params.row.userId,
                          name:params.row.name
                        };
                        Cookies.set('choosedUserInfo',this.choosedUserInfo)
                        this.chooseUser = false;
                      }
                    }
                  }, '选中')
                ]);
              }
            }
          ],
          choosedId:'',
          permissions:2,
          ruleInline:{
            oldPsd: [
              { required: true,validator: validatePsd, trigger: 'blur' }
            ],
            newPsd: [
              {required: true, validator: validatePsd, trigger: 'blur' }
            ],
            newPsdf: [
              { required: true,validator: validatePassf, trigger: 'blur' }
            ],
          },
          changeLoginForm:{
            oldPsd:'',
            newPsd:'',
            newPsdf:''
          },
          changePsd:false,
            shrink: false,
            msgNum:0,
            userId:'',
          accessToken:'',
            userName: '',
            language:'allForCn',
          activeName:''
        };
    },
    computed: {
      ...mapState({
        theUrl: state => state.user.theUrl
      }),
      menuList () {
        const  _this = this;
        let list = this.$store.state.app.menuList;
        let hasList = [];
            list.forEach(function(val,index){
              /*超级管理员*/
              if(_this.permissions==1){
                if(val.name=='data-center'||val.name=='customer'){
                  hasList.push(val)
                }
                /*普通用户*/
              }else if(_this.permissions==2){
                if(val.name=='online-watch'||val.name=='data-info'||val.name=='device-management'||val.name=="user-management"){
                  hasList.push(val)
                }
                /*子用户*/
              }else if(_this.permissions==3){
                if(val.name=='online-watch'||val.name=='data-info'||val.name=='device-management-1'||val.name=="user-management-child"){
                  hasList.push(val)
                }
              }
            })
            return hasList
        },
      lang(){
         return this.$store.state.lang.systemItem
      }
    },
      watch:{
        chooseUser(newVal,oldVal){
          if(newVal){
            this.searchList(0)
          }
        },
      },
      mounted(){
      this.language = Cookies.get("language")
      if(Cookies.get('choosedUserInfo')!=undefined){
        this.choosedUserInfo = JSON.parse(Cookies.get('choosedUserInfo'));
      }
        this.permissions =  Cookies.get('permissions');
        this.userName =  Cookies.get('account');
        this.msgNum =   Cookies.get('msgNum');
        this.userId =   Cookies.get('userId');
        this.accessToken =  Cookies.get('accessToken');
        this.companyName = Cookies.get('companyName');
          this.handleChange()
      },
    methods: {
      ...mapActions(['changeLanguage']),
      changePage(it){
        this.currentPage = it-1;
        this.searchList(this.currentPage);
      },
      handleChange(){
        if(this.$route.name=='home_index') {
          if (this.permissions == '1') {
            this.activeName = 'online-data'
            this.$refs.sideMenu.handleChange('online-data')
          } else if (this.permissions == '2') {
            this.activeName = 'online-data-1'
            this.$refs.sideMenu.handleChange('online-data-1')
          } else if (this.permissions == '3') {
            this.activeName = 'online-data-1'
            this.$refs.sideMenu.handleChange('online-data-1')
          }
        }else{
          this.activeName = this.$route.name
        }
      },
      searchList(page){
        this.currentPage = page;
        let data = {
          userAccount:this.searchTxt,
          rows:this.pageSize,
          page:page,
          userId:this.userId,
          loginType:2,
          accessToken:this.accessToken,
          permissions:this.permissions
        };
        this.$http({
          method:'post',
          url:this.$util.ajaxUrl+"/adminUser/selectUsers",
          data
        },(res)=>{
          let result = res.data;
          if(result.code==0){
            this.totalPage = result.data.count;
            this.userData = result.data.dataList
          }else{
            this.$Message.error(res.data.msg)
          }

        },(erro)=>{
          console.log(erro);
        })
      },
      /*更改密码*/
      changeThePsd(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            let data = {
              oldPwd:this.changeLoginForm.oldPsd,
              pwd:this.changeLoginForm.newPsd,
              userId:this.userId,
              loginType:2,
              accessToken:this.accessToken,
              permissions:this.permissions
            };
            this.$http({
              method:'post',
              url:this.$util.ajaxUrl+"/user/updatePwd",
              data
            },(res)=>{
              let result = res.data;
              if(result.code==0){
                this.changePsd = false;
                this.$Message.error('密码修改成功')
              }else{
                this.$Message.error(res.data.msg)
              }

            },(erro)=>{
              console.log(erro);
            })
          } else {
            this.$Message.error('请先完善表单信息!');
          }
        })

      },
        changeLang(value){
            this.language = value;
            this.$store.dispatch("changeLanguage", value);
          Cookies.set('language', value);
        },
      /*退出登陆*/
      loginOut(){
        let data = {
          userId:this.userId,
          loginType:2,
          accessToken:this.accessToken,
          permissions:this.permissions
        };
        this.$http({
            method:'post',
            url:this.$util.ajaxUrl+"/user/logout",
            data
          },(res)=>{
            let result = res.data;
            if(result.code==0){
              this.$Message.success("退出成功");
              this.$router.push({
                name: 'login'
              });
            }else{
              this.$Message.success(result.msg);
            }
         },(erro)=>{

         })
      },
        toggleClick () {
            this.shrink = !this.shrink;
        },
        handleClickUserDropdown (name) {
          if(name=='loginout'){
            this.loginOut()
          }else{
            this.changePsd = true
          }

        }
    }
};
</script>
