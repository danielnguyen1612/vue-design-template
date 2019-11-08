<template lang="pug">
  .border.rounded.px-2.py-1
    .d-block.mb-1 {{data.label}}
    input.form-control(:id="data.id")
    span(v-if="showCloseIcon", @click="$emit('remove', data)") &times;
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class TemplateComponent extends Vue {
  @Prop({required: true, default: {}}) public data!: any;
  @Prop({default: false}) public canRemove!: boolean;
  @Prop({default: {}}) private currentComponent!: any;

  public get showCloseIcon(): boolean {
      if (!this.currentComponent) {
          return false;
      }
      return this.currentComponent.id === this.data.id && this.canRemove;
  }
}
</script>

<style lang="scss" scoped>
  div {
    position: relative;

    * {
      cursor: pointer;
    }

    span {
      position: absolute;
      right: 5px;
      top: -5px;
    }

    input {
      height: 30px;
    }
  }
</style>
