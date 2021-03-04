<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>111{{ name }}</p>
    <HelloWorld @CloseIt="onCloseIt" msg="Welcome to Your Vue.js + TypeScript App1" />
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    HelloWorld
  },
  setup() {
    const name = ref('你好')
    const onCloseIt = () => {
      console.log(1)
    }
    return { name, onCloseIt }
  }
})
</script>
