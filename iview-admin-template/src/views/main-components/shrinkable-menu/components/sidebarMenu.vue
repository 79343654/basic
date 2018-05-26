<style lang="less">
    @import '../styles/menu.less';
</style>

<template>
    <Menu ref="sideMenu" active-name="$route.name"   :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="(item,index) in menuList">
            <Submenu :name="item.name" :key="index">
                <template slot="title">
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="(child,childrenIndex) in item.children">
                    <MenuItem :name="child.name" :key="childrenIndex">
                        <span class="layout-text" :key="childrenIndex">{{ child.title }}</span>
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
            openNames:['']
          }
    },
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        }
    },
    methods: {
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
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>
