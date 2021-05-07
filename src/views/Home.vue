<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <c-button :c="cButtonConfig">12</c-button>
    <p>111{{ name }}</p>
    <HelloWorld
      @CloseIt="onCloseIt"
      msg="Welcome to Your Vue.js + TypeScript App1"
    />
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { ButtonAdapter } from '@cvue/element-plus/src/base/button/button.adapter'
import { HttpSend } from '@cvue/http'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    HelloWorld
  },
  async setup() {
    const name = ref('你好')
    const onCloseIt = () => {
      console.log(1)
    }
    const res = await HttpSend({
      url: '/name',
      method: 'GET',
      params: { a: '1' }
    })
    const cButtonConfig = ref<ButtonAdapter>({
      disabled: true,
      text: '',
      type: 'primary',
    })
    console.log(res)
    return { name, onCloseIt, cButtonConfig }
  }
})
</script>
