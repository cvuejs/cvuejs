<template>
  <el-pagination
    class="c-pagination"
    :ref="$options.name"
    v-bind="$$bind"
    v-on="$$on"
  ></el-pagination>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import BaseFactory from '../../factory/base.factory';
import { CoreBase } from '../../dtos/core.dto';
import { ComponentTypes } from '../../dtos/factories.dto';
import { PaginationOutput, PaginationAdapter, PAGINATION_DEFAULT } from './adapter';
import _ from 'lodash';

@Component({ name: 'CPagination' })
export default class Pagination extends Mixins(BaseFactory) implements CoreBase {
  @Prop({ type: Object, default: () => ({}) }) c!: PaginationAdapter;
  @Prop({ type: String }) n?: string;

  get Config(): PaginationAdapter {
    return _(this.c)
      .defaultsDeepSafe(PAGINATION_DEFAULT)
      .value();
  }
  get Output(): PaginationOutput {
    return {
      this: this.c
    };
  }

  ComponentType = ComponentTypes.Pagination;
  OwnAdapterKeys = [];
}
</script>

<style lang="scss"></style>
