<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                    :language = 'language'
                :shrink="shrink"
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
                                        <DropdownItem name="reset" divided>{{lang.resetPsd}}</DropdownItem>
                                    </DropdownMenu>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="loginout" divided>{{lang.loginOut}}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Avatar icon="person" style="background: #619fe7;margin-left:10px;"></Avatar>
                            </Row>
                        </div>
                    </div>
                    <div class="note-num">
                        {{lang.noteNum}}：90909
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
        return {
            shrink: false,
            userName: '121212',
            language:'allForCn'
        };
    },
    computed: {
        menuList () {
            return this.$store.state.app.menuList;
        },
      lang(){
         return this.$store.state.lang.systemItem
      }
    },
    methods: {
      ...mapActions(['changeLanguage']),
        changeLang(value){
            this.language = value;
            this.$store.dispatch("changeLanguage", value)
        },
        init () {
            // this.userName = Cookies.get('user');
        },
        toggleClick () {
            this.shrink = !this.shrink;
        },
        handleClickUserDropdown (name) {
            this.$router.push({
                name: 'login'
            });
        }
    },
    mounted () {
        this.init();
    }
};
</script>
