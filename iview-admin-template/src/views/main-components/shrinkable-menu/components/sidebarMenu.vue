<style lang="less">
    @import '../styles/menu.less';
</style>

<template>
    <Menu ref="sideMenu" :active-name="activeName" :open-names="openNames" @on-open-change="openMenu" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList" v-if="menuList.length>0">
            <Submenu name="1">
                <template slot="title">
                    <span class="layout-text">{{ language=='allForCn'?item.title:item.name }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" >
                        <span class="layout-text" >{{ language=='allForCn'?child.title:child.name }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    data(){
          return {
            activeName:'',
            openNames:['1']
          }
    },
    props: {
        language:String,
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        }
    },
      mounted(){
        console.log(this.$route.name)
        this.activeName = this.$route.name;
      },
      updated () {
        this.$nextTick(() => {
          if (this.$refs.sideMenu) {
            this.$refs.sideMenu.updateOpened();
          }
        });
      },
    methods: {
        openMenu(it){
            console.log(this.openNames)
        },
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    }


};
</script>
