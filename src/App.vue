<template>
  <router-view />
  <c-button :c="buttonConfig"></c-button>
</template>

<script lang="ts">
import { ButtonAdapter } from '@cvue/element-plus/src/base/button/adapter'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const buttonConfig: ButtonAdapter = {
      text: '32',
      onClick() {
        console.log(1)
      }
    }
    return {
      buttonConfig
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
