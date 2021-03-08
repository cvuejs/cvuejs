<template>
  <div class="bs-input-text">
    Text Working!
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { BsTextConfig } from './text.config';

@Component({})
export default class BsText extends Mixins(BsTextConfig) {}
</script>

<style lang="scss">
</style>
