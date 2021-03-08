<template>
  <div class="the-draw">
    TheDraw Working!
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { TheDrawConfig } from './TheDraw.config';

@Component({})
export default class TheDraw extends Mixins(TheDrawConfig) {

}
</script>

<style lang="scss">
</style>
