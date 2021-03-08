<template>
  <el-button
    class="c-button"
    :ref="$options.name"
    v-bind="$$bind"
    v-on="$$on"
  ></el-button>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import BaseFactory from '../../factory/base.factory'
import { CoreBase } from '../../dtos/core.dto'
import { ComponentTypes } from '../../dtos/factories.dto'
import { ButtonOutput, ButtonAdapter, BUTTON_DEFAULT } from './adapter'
import _ from 'lodash'

@Component({ name: 'CButton' })
export default class Button extends Mixins(BaseFactory) implements CoreBase {
  @Prop({ type: Object, default: () => ({}) }) c!: ButtonAdapter
  @Prop({ type: String }) n?: string

  get Config(): ButtonAdapter {
    return _(this.c)
      .defaultsDeepSafe(BUTTON_DEFAULT)
      .value()
  }
  get Output(): ButtonOutput {
    return {
      this: this.c
    }
  }

  ComponentType = ComponentTypes.Button
  OwnAdapterKeys = []
}
</script>

<style lang="scss"></style>
