<template>
  <div class="the-input">
    TheInput Working!
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { TheInputConfig } from './TheInput.config';
import BsText from './components/text/text.vue';

@Component({
  components: {
    BsText // <bs-text>
  }
})
export default class TheInput extends Mixins(TheInputConfig) {

}
</script>

<style lang="scss">
</style>
