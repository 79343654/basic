<template>
  <div id="app">
    <Index></Index>
  </div>
</template>

<script>
  import { Button } from 'mint-ui'
  import Index from "./components/index"
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    Button,
    Index
  }
}
</script>

<style lang="scss">

</style>
